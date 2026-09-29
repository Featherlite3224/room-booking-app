* {
  box-sizing: border-box;
}

:root {
  --bg: #f5f7fb;
  --panel: #ffffff;
  --bg-soft: #eef3ff;
  --primary: #3b82f6;
  --primary-dark: #1d4ed8;
  --text: #18212f;
  --muted: #667085;
  --border: #dfe8f4;
  --success: #10b981;
  --warning: #f59e0b;
  --shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
}

html,
body,
#root {
  margin: 0;
  min-height: 100%;
  height: 100%;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #eef4ff 0%, #f8fafc 100%);
  color: var(--text);
}

body {
  min-height: 100vh;
}

button,
input {
  font: inherit;
}

button {
  cursor: pointer;
}

.app-shell {
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr);
  min-height: 100vh;
  gap: 24px;
  padding: 28px;
}

.sidebar,
.main-panel,
.room-card,
.booking-modal {
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(223, 232, 244, 0.9);
  box-shadow: var(--shadow);
}

.sidebar {
  border-radius: 26px;
  padding: 28px 20px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.eyebrow {
  margin: 0 0 8px;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  font-weight: 700;
}

h1,
h2,
h3,
p {
  margin: 0;
}

h1 {
  font-size: clamp(2rem, 3vw, 2.5rem);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--text);
  font-size: 0.92rem;
  font-weight: 600;
}

.field input[type='text'],
.field input[type='date'],
.field input[type='time'],
.field input[type='number'] {
  border: 1px solid var(--border);
  border-radius: 12px;
  background: #f9fbff;
  padding: 0.75rem 0.9rem;
  font-size: 0.96rem;
  color: var(--text);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.field input:focus {
  outline: none;
  border-color: rgba(59, 130, 246, 0.8);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12);
}

.check-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.check-row input {
  width: 18px;
  height: 18px;
  accent-color: var(--primary);
}

.stats-panel {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  background: var(--bg-soft);
  border-radius: 16px;
  padding: 14px;
}

.stats-panel div {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.8rem;
  color: var(--muted);
}

.stats-panel strong {
  color: var(--text);
  font-size: 1.25rem;
}

.main-panel {
  border-radius: 28px;
  padding: 28px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.primary-button,
.secondary-button,
.room-footer button {
  border: none;
  border-radius: 12px;
  padding: 0.8rem 1.1rem;
  font-weight: 700;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.primary-button,
.room-footer button {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
}

.secondary-button {
  background: #edf3ff;
  color: var(--primary-dark);
}

.primary-button:hover,
.secondary-button:hover,
.room-footer button:hover {
  transform: translateY(-1px);
}

.room-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.room-card {
  display: flex;
  flex-direction: column;
  border-radius: 22px;
  padding: 20px;
  gap: 14px;
}

.room-topline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.status {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 0.75rem;
  font-weight: 700;
}

.status.available {
  background: rgba(16, 185, 129, 0.12);
  color: #0f766e;
}

.status.booked {
  background: rgba(245, 158, 11, 0.12);
  color: #92400e;
}

.capacity {
  color: var(--muted);
  font-size: 0.8rem;
  font-weight: 600;
}

.room-card h3 {
  font-size: 1.7rem;
}

.location,
.zone {
  color: var(--muted);
}

.amenities {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  background: #f1f5f9;
  color: #334155;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 0.72rem;
  font-weight: 600;
}

.room-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  color: var(--muted);
  font-size: 0.8rem;
  font-weight: 600;
}

.room-footer button {
  padding: 0.7rem 0.85rem;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(4px);
  display: grid;
  place-items: center;
  padding: 24px;
}

.booking-modal {
  width: min(100%, 560px);
  border-radius: 24px;
  padding: 24px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 18px;
}

.close-button {
  border: none;
  background: transparent;
  color: var(--muted);
  font-size: 2rem;
  line-height: 1;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 16px;
}

.modal-summary {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #f8fafc;
  border-radius: 14px;
  border: 1px solid var(--border);
  padding: 12px 14px;
  color: var(--muted);
  margin-bottom: 20px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

@media (max-width: 900px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .field-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .app-shell {
    padding: 18px;
  }

  .main-panel,
  .sidebar {
    padding: 20px 16px;
  }

  .panel-header,
  .room-footer,
  .modal-actions {
    flex-direction: column;
    align-items: stretch;
  }
}
