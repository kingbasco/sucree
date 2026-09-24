import { useEffect, useMemo, useState } from "react"
import type { FormEvent, ReactNode } from "react"
import { supabase, isSupabaseConfigured } from "./lib/supabase"

type Memory = {
  id: string
  number: number
  label: string
  title: string
  body: string
  note: string
  image_url: string | null
  is_visible: boolean
}

type SiteContent = Record<string, string>

const contentLabels: Record<string, string> = {
  ending_eyebrow: "Ending eyebrow",
  ending_title: "Ending title (use | between lines)",
  ending_copy: "Ending message",
  ending_signoff: "Ending sign-off",
  easter_egg_title: "Easter egg trigger",
  easter_egg_date: "Easter egg date",
  easter_egg_body: "Easter egg message",
  easter_egg_signoff: "Easter egg sign-off",
}

export default function Admin() {
  const [session, setSession] = useState<any>(null)
  const [memories, setMemories] = useState<Memory[]>([])
  const [selected, setSelected] = useState<Memory | null>(null)
  const [content, setContent] = useState<SiteContent>({})
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (!supabase) {
      return
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      if (data.session) void loadContent()
      else setLoading(false)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
      if (next) void loadContent()
      else setLoading(false)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  async function loadContent() {
    if (!supabase) return
    const [memoryResult, contentResult] = await Promise.all([
      supabase.from("memories").select("*").order("number"),
      supabase.from("site_content").select("id,value"),
    ])
    if (memoryResult.error) setMessage(memoryResult.error.message)
    else setMemories((memoryResult.data ?? []) as Memory[])
    if (!contentResult.error) {
      const next: SiteContent = {}
      for (const row of contentResult.data ?? []) next[row.id] = row.value
      setContent(next)
    }
  }

  async function signIn(event: FormEvent) {
    event.preventDefault()
    if (!supabase) return
    setMessage("")
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
  }

  async function signOut() {
    await supabase?.auth.signOut()
  }

  async function saveMemory(event: FormEvent) {
    event.preventDefault()
    if (!supabase || !selected) return
    setSaving(true)
    setMessage("")
    const payload = {
      number: selected.number,
      label: selected.label,
      title: selected.title,
      body: selected.body,
      note: selected.note,
      image_url: selected.image_url,
      is_visible: selected.is_visible,
      updated_at: new Date().toISOString(),
    }
    const query = selected.id
      ? supabase.from("memories").update(payload).eq("id", selected.id)
      : supabase.from("memories").insert(payload)
    const { error } = await query
    setSaving(false)
    if (error) {
      setMessage(error.message)
      return
    }
    setMessage("Memory saved.")
    await loadContent()
  }

  async function uploadImage(file: File) {
    if (!supabase || !selected) return
    setSaving(true)
    setMessage("")
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-")
    const path = `memories/${Date.now()}-${safeName}`
    const upload = await supabase.storage.from("sucree-media").upload(path, file, {
      cacheControl: "31536000",
      upsert: false,
    })
    if (upload.error) {
      setSaving(false)
      setMessage(upload.error.message)
      return
    }
    const { data } = supabase.storage.from("sucree-media").getPublicUrl(path)
    setSelected({ ...selected, image_url: data.publicUrl })
    setSaving(false)
    setMessage("Image uploaded. Save the memory to publish it.")
  }

  async function deleteMemory(id: string) {
    if (!supabase || !confirm("Delete this memory permanently?")) return
    const { error } = await supabase.from("memories").delete().eq("id", id)
    if (error) setMessage(error.message)
    else {
      setSelected(null)
      setMessage("Memory deleted.")
      await loadContent()
    }
  }

  async function toggleVisibility(memory: Memory) {
    if (!supabase) return
    const { error } = await supabase.from("memories").update({ is_visible: !memory.is_visible }).eq("id", memory.id)
    if (error) setMessage(error.message)
    else await loadContent()
  }

  async function moveMemory(memory: Memory, direction: -1 | 1) {
    if (!supabase) return
    const ordered = [...memories].sort((a, b) => a.number - b.number)
    const index = ordered.findIndex((item) => item.id === memory.id)
    const target = ordered[index + direction]
    if (!target) return
    const first = await supabase.from("memories").update({ number: 9999 }).eq("id", memory.id)
    if (first.error) return setMessage(first.error.message)
    const second = await supabase.from("memories").update({ number: memory.number }).eq("id", target.id)
    if (second.error) return setMessage(second.error.message)
    const third = await supabase.from("memories").update({ number: target.number }).eq("id", memory.id)
    if (third.error) return setMessage(third.error.message)
    await loadContent()
  }

  async function addMemory() {
    if (!supabase) return
    const nextNumber = memories.length ? Math.max(...memories.map((m) => m.number)) + 1 : 1
    const { data, error } = await supabase.from("memories").insert({
      number: nextNumber,
      label: "new memory",
      title: "Your new memory",
      body: "Write the story here.",
      note: "Add a little note here.",
      is_visible: true,
    }).select().single()
    if (error) return setMessage(error.message)
    setMemories((current) => [...current, data as Memory].sort((a, b) => a.number - b.number))
    setSelected(data as Memory)
    setMessage("New memory created.")
  }

  async function saveSiteContent() {
    if (!supabase) return
    setSaving(true)
    for (const [id, value] of Object.entries(content)) {
      const { error } = await supabase.from("site_content").upsert({ id, value, updated_at: new Date().toISOString() })
      if (error) {
        setMessage(error.message)
        setSaving(false)
        return
      }
    }
    setSaving(false)
    setMessage("Ending and Easter egg saved.")
  }

  const filtered = useMemo(
    () => memories.filter((m) => [m.label, m.title, m.body].join(" ").toLowerCase().includes(search.toLowerCase())),
    [memories, search],
  )

  if (!isSupabaseConfigured) {
    return <AdminShell><div className="admin-empty"><h1>Backend not connected</h1><p>Add the Supabase environment variables to run the admin.</p></div></AdminShell>
  }

  if (!session) {
    return (
      <AdminShell>
        <div className="admin-login">
          <span className="admin-kicker">sucree · private</span>
          <h1>Welcome back.</h1>
          <p>Sign in to edit the story, photos and ending.</p>
          <form onSubmit={signIn}>
            <label>Email<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required /></label>
            <label>Password<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required /></label>
            {message && <p className="admin-error">{message}</p>}
            <button className="admin-primary" type="submit">Sign in</button>
          </form>
        </div>
      </AdminShell>
    )
  }

  return (
    <AdminShell>
      <header className="admin-header">
        <div><span className="admin-kicker">sucree · private studio</span><h1>Your story.</h1><p>Change the memories without touching the code.</p></div>
        <button className="admin-ghost" onClick={signOut}>Log out</button>
      </header>

      {message && <div className="admin-toast">{message}</div>}

      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-top"><strong>{memories.length} memories</strong><button onClick={addMemory}>+ Add memory</button></div>
          <input className="admin-search" placeholder="Search memories..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <div className="admin-memory-list">
            {filtered.map((memory) => (
              <button key={memory.id} className={selected?.id === memory.id ? "admin-memory-row active" : "admin-memory-row"} onClick={() => setSelected({ ...memory })}>
                <span>{String(memory.number).padStart(2, "0")}</span>
                <span><b>{memory.title || "Untitled"}</b><small>{memory.is_visible ? "Visible" : "Hidden"}</small></span>
              </button>
            ))}
          </div>
        </aside>

        <section className="admin-editor">
          {selected ? (
            <form onSubmit={saveMemory}>
              <div className="admin-editor-head"><div><span className="admin-kicker">memory {String(selected.number).padStart(2, "0")}</span><h2>Edit memory</h2></div><div className="admin-actions"><button type="button" onClick={() => moveMemory(selected, -1)}>↑</button><button type="button" onClick={() => moveMemory(selected, 1)}>↓</button><button type="button" onClick={() => toggleVisibility(selected)}>{selected.is_visible ? "Hide" : "Show"}</button><button type="button" className="admin-danger" onClick={() => deleteMemory(selected.id)}>Delete</button></div></div>
              <div className="admin-form-grid">
                <label>Order<input type="number" value={selected.number} min="1" onChange={(e) => setSelected({ ...selected, number: Number(e.target.value) })} /></label>
                <label>Label<input value={selected.label} onChange={(e) => setSelected({ ...selected, label: e.target.value })} /></label>
              </div>
              <label>Title<input value={selected.title} onChange={(e) => setSelected({ ...selected, title: e.target.value })} /></label>
              <label>Story<textarea rows={7} value={selected.body} onChange={(e) => setSelected({ ...selected, body: e.target.value })} /></label>
              <label>Little note<textarea rows={3} value={selected.note} onChange={(e) => setSelected({ ...selected, note: e.target.value })} /></label>
              <div className="admin-image-box">
                <div>{selected.image_url ? <img src={selected.image_url} alt="" /> : <span>No image yet</span>}</div>
                <label className="admin-upload">Replace image<input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])} /></label>
              </div>
              <button className="admin-primary" type="submit" disabled={saving}>{saving ? "Saving..." : "Save memory"}</button>
            </form>
          ) : (
            <div className="admin-empty"><h2>Choose a memory.</h2><p>Select one on the left, or create a new one.</p></div>
          )}
        </section>
      </div>

      <section className="admin-content-panel">
        <div><span className="admin-kicker">final scene</span><h2>Ending & hidden Easter egg</h2><p>Edit the words she sees after the last memory.</p></div>
        <div className="admin-site-grid">
          {Object.keys(contentLabels).map((key) => (
            <label key={key}>{contentLabels[key]}{key.includes("body") || key === "ending_copy" ? <textarea rows={4} value={content[key] ?? ""} onChange={(e) => setContent({ ...content, [key]: e.target.value })} /> : <input value={content[key] ?? ""} onChange={(e) => setContent({ ...content, [key]: e.target.value })} />}</label>
          ))}
        </div>
        <button className="admin-primary" onClick={saveSiteContent} disabled={saving}>{saving ? "Saving..." : "Save ending"}</button>
      </section>
    </AdminShell>
  )
}

function AdminShell({ children }: { children: ReactNode }) {
  return <main className="admin-page">{children}</main>
}
