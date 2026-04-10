import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAdmin } from '../context/AdminContext';

const AdminPanel = () => {
  const { isAdmin: isAuthenticated, login, logout, getToken } = useAdmin();
  const [password, setPassword] = useState('');

  // ─── Tab ──────────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'messages'

  // ─── Projects State ───────────────────────────────────────────────────────────
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '', tags: '', linkUrl: '', codeUrl: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', tags: '', linkUrl: '', codeUrl: '' });
  const [isSaving, setIsSaving] = useState(false);

  // ─── Messages State ───────────────────────────────────────────────────────────
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [expandedMsg, setExpandedMsg] = useState(null);

  const apiUrl = 'http://localhost:5000/api/projects';
  const msgUrl = 'http://localhost:5000/api/messages';

  useEffect(() => {
    const token = getToken();
    if (token) verifyToken(token);
  }, []);

  const verifyToken = async (token) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/verify`, {
        method: 'POST',
        headers: { 'x-admin-password': token }
      });
      if (res.ok) {
        fetchProjects();
        fetchMessages(token); // pass token directly — sessionStorage may not be set yet
      } else {
        logout();
      }
    } catch (err) {
      console.error('Verification failed', err);
    }
  };

  // ── Projects ──────────────────────────────────────────────────────────────────
  const fetchProjects = async () => {
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (password.trim() === '') return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/verify`, {
        method: 'POST',
        headers: { 'x-admin-password': password }
      });
      if (res.ok) {
        login(password);
        fetchProjects();
        fetchMessages(password); // pass token directly after login
      } else {
        alert('Incorrect Admin Password! Redirecting...');
        window.location.href = '/';
      }
    } catch (err) {
      console.error('Login verification failed', err);
      alert('Error verifying password with server.');
    }
  };

  const handleLogout = () => {
    logout();
    setProjects([]);
    setMessages([]);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': sessionStorage.getItem('adminToken') }
      });
      if (res.ok) {
        setProjects(projects.filter(p => p._id !== id));
      } else {
        const data = await res.json();
        alert('Delete failed: ' + data.message);
        if (res.status === 401) handleLogout();
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting project');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const tagsArray = newProject.tags.split(',').map(t => t.trim()).filter(Boolean);
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': sessionStorage.getItem('adminToken')
        },
        body: JSON.stringify({ ...newProject, tags: tagsArray })
      });
      if (res.ok) {
        const data = await res.json();
        setProjects([...projects, data.project]);
        setNewProject({ title: '', description: '', tags: '', linkUrl: '', codeUrl: '' });
      } else {
        const data = await res.json();
        alert('Failed to add: ' + data.message);
        if (res.status === 401) handleLogout();
      }
    } catch (err) {
      console.error(err);
      alert('Error adding project');
    } finally {
      setIsLoading(false);
    }
  };

  const openEdit = (project) => {
    setEditingProject(project);
    setEditForm({
      title: project.title || '',
      description: project.description || '',
      tags: Array.isArray(project.tags) ? project.tags.join(', ') : (project.tags || ''),
      linkUrl: project.linkUrl || '',
      codeUrl: project.codeUrl || '',
    });
  };

  const closeEdit = () => {
    setEditingProject(null);
    setEditForm({ title: '', description: '', tags: '', linkUrl: '', codeUrl: '' });
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const tagsArray = editForm.tags.split(',').map(t => t.trim()).filter(Boolean);
      const res = await fetch(`${apiUrl}/${editingProject._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': sessionStorage.getItem('adminToken')
        },
        body: JSON.stringify({ ...editForm, tags: tagsArray })
      });
      if (res.ok) {
        const data = await res.json();
        setProjects(projects.map(p => p._id === editingProject._id ? data.project : p));
        closeEdit();
      } else {
        const data = await res.json();
        alert('Update failed: ' + data.message);
        if (res.status === 401) handleLogout();
      }
    } catch (err) {
      console.error(err);
      alert('Error updating project');
    } finally {
      setIsSaving(false);
    }
  };

  // ── Messages ──────────────────────────────────────────────────────────────────
  const fetchMessages = async (token) => {
    const authToken = token || sessionStorage.getItem('adminToken');
    setMessagesLoading(true);
    try {
      const res = await fetch(msgUrl, {
        headers: { 'x-admin-password': authToken }
      });
      console.log('[fetchMessages] status:', res.status);
      if (!res.ok) {
        console.error('[fetchMessages] Auth failed or server error:', res.status);
        setMessages([]);
        return;
      }
      const data = await res.json();
      console.log('[fetchMessages] received:', data);
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      const res = await fetch(`${msgUrl}/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': sessionStorage.getItem('adminToken') }
      });
      if (res.ok) {
        setMessages(messages.filter(m => m._id !== id));
        if (expandedMsg === id) setExpandedMsg(null);
      } else {
        alert('Failed to delete message');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting message');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  // ─── Login Screen ──────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-surface flex flex-col text-on-surface">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4 pt-28">
          <form onSubmit={handleLogin} className="bg-surface-container-high p-8 rounded-xl shadow-xl w-full max-w-md border border-primary/20">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h2>
            <div className="mb-4">
              <label className="block text-on-surface-variant mb-2">Admin Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-variant rounded-lg p-3 text-white border border-transparent focus:border-primary focus:outline-none"
                required
              />
            </div>
            <button type="submit" className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:bg-primary/90 transition">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── Dashboard ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-surface flex flex-col text-on-surface">
      <Navbar />

      {/* ── Edit Project Modal ── */}
      {editingProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) closeEdit(); }}
        >
          <div className="bg-[#1a1a1a] border border-[#2DD4BF]/30 rounded-2xl shadow-2xl w-full max-w-lg p-8 relative">
            <button onClick={closeEdit} className="absolute top-4 right-4 text-gray-400 hover:text-white transition text-2xl leading-none" aria-label="Close">✕</button>
            <h2 className="text-2xl font-bold text-white mb-1">Edit Project</h2>
            <p className="text-sm text-gray-400 mb-6">Update the details below and save.</p>
            <form onSubmit={handleEditSave} className="flex flex-col gap-4">
              {[
                { label: 'Title *', key: 'title', required: true },
                { label: 'Live URL', key: 'linkUrl' },
                { label: 'GitHub URL', key: 'codeUrl' },
              ].map(({ label, key, required }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-[#2DD4BF] uppercase tracking-widest mb-1">{label}</label>
                  <input
                    required={required}
                    value={editForm[key]}
                    onChange={e => setEditForm({ ...editForm, [key]: e.target.value })}
                    className="w-full bg-[#0e0e0e] text-white p-3 rounded-lg border border-white/10 focus:border-[#2DD4BF] focus:outline-none transition"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-[#2DD4BF] uppercase tracking-widest mb-1">Description *</label>
                <textarea required value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} className="w-full bg-[#0e0e0e] text-white p-3 rounded-lg border border-white/10 focus:border-[#2DD4BF] focus:outline-none transition h-24 resize-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#2DD4BF] uppercase tracking-widest mb-1">Tags (comma separated)</label>
                <input value={editForm.tags} onChange={e => setEditForm({ ...editForm, tags: e.target.value })} placeholder="React, Node, MongoDB" className="w-full bg-[#0e0e0e] text-white p-3 rounded-lg border border-white/10 focus:border-[#2DD4BF] focus:outline-none transition" />
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={closeEdit} className="flex-1 py-3 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition font-semibold">Cancel</button>
                <button type="submit" disabled={isSaving} className="flex-1 py-3 rounded-lg bg-[#2DD4BF] text-black font-bold hover:bg-[#2DD4BF]/90 transition disabled:opacity-50">
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="p-8 pt-28">
        <div className="max-w-6xl mx-auto">

          {/* ── Header ── */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 mt-1 text-sm">Manage your portfolio content</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500/10 text-red-400 border border-red-500/20 px-5 py-2 rounded-lg font-bold hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          </div>

          {/* ── Tabs ── */}
          <div className="flex gap-2 mb-8 border-b border-white/10 pb-0">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-5 py-2.5 rounded-t-lg font-semibold text-sm transition border-b-2 -mb-px ${activeTab === 'projects'
                  ? 'text-[#2DD4BF] border-[#2DD4BF] bg-[#2DD4BF]/5'
                  : 'text-gray-400 border-transparent hover:text-white'
                }`}
            >
              🗂 Projects
              <span className="ml-2 text-xs bg-white/10 px-1.5 py-0.5 rounded-full">{projects.length}</span>
            </button>
            <button
              onClick={() => { setActiveTab('messages'); fetchMessages(); }}
              className={`px-5 py-2.5 rounded-t-lg font-semibold text-sm transition border-b-2 -mb-px ${activeTab === 'messages'
                  ? 'text-[#2DD4BF] border-[#2DD4BF] bg-[#2DD4BF]/5'
                  : 'text-gray-400 border-transparent hover:text-white'
                }`}
            >
              💬 Messages
              <span className="ml-2 text-xs bg-white/10 px-1.5 py-0.5 rounded-full">{messages.length}</span>
            </button>
          </div>

          {/* ══════════════════════ PROJECTS TAB ══════════════════════ */}
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-white">

              {/* Add Project Form */}
              <div className="bg-[#141414] p-6 rounded-2xl border border-white/5 h-fit shadow-xl">
                <h2 className="text-xl font-bold mb-1 text-white">Add New Project</h2>
                <p className="text-xs text-gray-400 mb-6">Fill in the details to publish a new project.</p>
                <form onSubmit={handleAddProject} className="flex flex-col gap-4">
                  {[
                    { label: 'Title *', key: 'title', required: true, placeholder: '' },
                    { label: 'Tags', key: 'tags', required: false, placeholder: 'React, Node, MongoDB' },
                    { label: 'Live URL', key: 'linkUrl', required: false, placeholder: '' },
                    { label: 'GitHub URL', key: 'codeUrl', required: false, placeholder: '' },
                  ].map(({ label, key, required, placeholder }) => (
                    <div key={key}>
                      <label className="block text-xs font-semibold text-[#2DD4BF] uppercase tracking-widest mb-1">{label}</label>
                      <input
                        required={required}
                        placeholder={placeholder}
                        value={newProject[key]}
                        onChange={e => setNewProject({ ...newProject, [key]: e.target.value })}
                        className="w-full bg-[#0e0e0e] text-white p-2.5 rounded-lg border border-white/10 focus:border-[#2DD4BF] focus:outline-none transition text-sm"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-semibold text-[#2DD4BF] uppercase tracking-widest mb-1">Description *</label>
                    <textarea required value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} className="w-full bg-[#0e0e0e] text-white p-2.5 rounded-lg border border-white/10 focus:border-[#2DD4BF] focus:outline-none transition h-24 resize-none text-sm" />
                  </div>
                  <button disabled={isLoading} type="submit" className="mt-2 w-full bg-[#2DD4BF] text-black font-bold py-2.5 rounded-lg hover:bg-[#2DD4BF]/90 transition disabled:opacity-50 text-sm">
                    {isLoading ? 'Adding...' : '+ Add Project'}
                  </button>
                </form>
              </div>

              {/* Project List */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold mb-6 text-white">Existing Projects</h2>
                <div className="flex flex-col gap-4">
                  {projects.length === 0 ? (
                    <div className="bg-[#141414] rounded-2xl border border-white/5 p-10 text-center text-gray-500">
                      No projects yet. Add one on the left!
                    </div>
                  ) : (
                    projects.map(project => (
                      <div key={project._id} className="bg-[#141414] p-5 rounded-2xl border border-white/5 hover:border-[#2DD4BF]/20 transition">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-bold text-white truncate">{project.title}</h3>
                            <p className="text-sm text-gray-400 mt-1 line-clamp-2">{project.description}</p>
                            {Array.isArray(project.tags) && project.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-3">
                                {project.tags.map((tag, i) => (
                                  <span key={i} className="text-xs bg-[#2DD4BF]/10 text-[#2DD4BF] px-2 py-0.5 rounded-full border border-[#2DD4BF]/20">{tag}</span>
                                ))}
                              </div>
                            )}
                            <div className="flex gap-4 mt-3">
                              {project.linkUrl && <a href={project.linkUrl} target="_blank" rel="noreferrer" className="text-xs text-gray-500 hover:text-[#2DD4BF] transition">🔗 Live</a>}
                              {project.codeUrl && <a href={project.codeUrl} target="_blank" rel="noreferrer" className="text-xs text-gray-500 hover:text-[#2DD4BF] transition">{'</>'} Code</a>}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 shrink-0">
                            <button onClick={() => openEdit(project)} disabled={isLoading} className="px-4 py-1.5 rounded-lg text-sm font-semibold bg-[#2DD4BF]/10 text-[#2DD4BF] border border-[#2DD4BF]/20 hover:bg-[#2DD4BF] hover:text-black transition disabled:opacity-50">✏️ Edit</button>
                            <button onClick={() => handleDelete(project._id)} disabled={isLoading} className="px-4 py-1.5 rounded-lg text-sm font-semibold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition disabled:opacity-50">🗑 Delete</button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════ MESSAGES TAB ══════════════════════ */}
          {activeTab === 'messages' && (
            <div>
              {/* <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Contact Messages</h2>
                <button onClick={fetchMessages} className="text-xs text-gray-400 hover:text-[#2DD4BF] transition border border-white/10 px-3 py-1.5 rounded-lg">
                  ↻ Refresh
                </button>
              </div> */}

              {messagesLoading ? (
                <div className="text-center py-20 text-gray-500">Loading messages...</div>
              ) : messages.length === 0 ? (
                <div className="bg-[#141414] rounded-2xl border border-white/5 p-16 text-center text-gray-500">
                  <p className="text-4xl mb-3">💬</p>
                  <p>No messages yet.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      className="bg-[#141414] rounded-2xl border border-white/5 hover:border-[#2DD4BF]/20 transition overflow-hidden"
                    >
                      {/* Card Header — always visible */}
                      <div
                        className="flex items-center justify-between p-5 cursor-pointer"
                        onClick={() => setExpandedMsg(expandedMsg === msg._id ? null : msg._id)}
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          {/* Avatar */}
                          <div className="w-10 h-10 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 flex items-center justify-center text-[#2DD4BF] font-bold text-sm shrink-0">
                            {msg.name ? msg.name.charAt(0).toUpperCase() : '?'}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-white text-sm truncate">{msg.name}</p>
                            <p className="text-xs text-gray-400 truncate">{msg.email}</p>
                          </div>
                          <div className="hidden sm:block ml-2 px-3 py-1 bg-white/5 rounded-lg min-w-0 max-w-xs">
                            <p className="text-xs text-gray-300 font-medium truncate">{msg.subject}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs text-gray-500 hidden md:block">{formatDate(msg.createdAt)}</span>
                          <span className="text-gray-500 text-sm">{expandedMsg === msg._id ? '▲' : '▼'}</span>
                        </div>
                      </div>

                      {/* Expanded Detail */}
                      {expandedMsg === msg._id && (
                        <div className="border-t border-white/5 px-5 pb-5 pt-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div className="bg-[#0e0e0e] rounded-xl p-4">
                              <p className="text-xs font-semibold text-[#2DD4BF] uppercase tracking-widest mb-1">Name</p>
                              <p className="text-white text-sm">{msg.name}</p>
                            </div>
                            <div className="bg-[#0e0e0e] rounded-xl p-4">
                              <p className="text-xs font-semibold text-[#2DD4BF] uppercase tracking-widest mb-1">Email</p>
                              <a href={`mailto:${msg.email}`} className="text-sm text-[#2DD4BF] hover:underline">{msg.email}</a>
                            </div>
                            <div className="bg-[#0e0e0e] rounded-xl p-4 sm:col-span-2">
                              <p className="text-xs font-semibold text-[#2DD4BF] uppercase tracking-widest mb-1">Subject</p>
                              <p className="text-white text-sm">{msg.subject}</p>
                            </div>
                            <div className="bg-[#0e0e0e] rounded-xl p-4 sm:col-span-2">
                              <p className="text-xs font-semibold text-[#2DD4BF] uppercase tracking-widest mb-1">Message</p>
                              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500">Received: {formatDate(msg.createdAt)}</p>
                            <div className="flex gap-2">
                              <a
                                href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                                className="px-4 py-1.5 rounded-lg text-sm font-semibold bg-[#2DD4BF]/10 text-[#2DD4BF] border border-[#2DD4BF]/20 hover:bg-[#2DD4BF] hover:text-black transition"
                              >
                                ↩ Reply
                              </a>
                              <button
                                onClick={() => handleDeleteMessage(msg._id)}
                                className="px-4 py-1.5 rounded-lg text-sm font-semibold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition"
                              >
                                🗑 Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
