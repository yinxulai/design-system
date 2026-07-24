const icon = (name) => {
  const paths = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="1"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',
  }
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">${paths[name]}</svg>`
}

const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
}[character]))

const copyText = async (value) => {
  try {
    await navigator.clipboard.writeText(value)
  } catch {
    const input = document.createElement('textarea')
    input.value = value
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    input.remove()
  }
  const toast = document.querySelector('#toast')
  toast.textContent = 'Registry URL copied to clipboard'
  toast.classList.add('is-visible')
  window.clearTimeout(window.copyToastTimer)
  window.copyToastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2400)
}

const renderSystem = (system) => {
  const previewImage = system.preview ? `${system.preview.replace(/\/$/, '')}/preview-light.png` : ''
  const previewHref = system.preview || `/${system.id}/preview/`
  const registryUrl = `${window.location.origin}${system.registry}`
  const useCases = (system.useCases || []).map((item) => `<span class="use-case">${escapeHtml(item)}</span>`).join('')

  return `<article class="system-card" data-accent="${escapeHtml(system.accent || 'orange')}">
    <a class="card-preview" href="${escapeHtml(previewHref)}" aria-label="Open ${escapeHtml(system.label || system.name)} preview">
      ${previewImage ? `<img src="${escapeHtml(previewImage)}" alt="${escapeHtml(system.label || system.name)} interface preview" loading="lazy" />` : '<div class="preview-placeholder">Preview coming soon</div>'}
      <span class="preview-label">Open preview ↗</span>
    </a>
    <div class="card-body">
      <div class="card-meta"><strong>${escapeHtml(system.label || system.name)}</strong><span>${String(system.items || 0).padStart(2, '0')} components</span></div>
      <h3 class="card-title">${escapeHtml(system.eyebrow || system.name)}</h3>
      <p class="card-description">${escapeHtml(system.description || 'A focused design language for building product interfaces.')}</p>
      ${system.style ? `<p class="style-note"><strong>Visual language.</strong> ${escapeHtml(system.style)}</p>` : ''}
      <div class="use-cases">${useCases}</div>
      <div class="card-actions">
        <a class="card-button primary" href="${escapeHtml(previewHref)}">Preview ${icon('arrow')}</a>
        <button class="card-button copy-button" type="button" data-copy="${escapeHtml(registryUrl)}">Copy Registry ${icon('copy')}</button>
      </div>
    </div>
  </article>`
}

const loadCatalog = async () => {
  const grid = document.querySelector('#system-grid')
  try {
    const response = await fetch('/registries.json')
    if (!response.ok) throw new Error('Catalog request failed')
    const catalog = await response.json()
    const systems = catalog.registries || []
    document.querySelector('#system-count').textContent = String(systems.length).padStart(2, '0')
    grid.innerHTML = systems.map(renderSystem).join('') || '<div class="loading-state">No design systems published yet.</div>'
    grid.querySelectorAll('[data-copy]').forEach((button) => button.addEventListener('click', () => copyText(button.dataset.copy)))
  } catch (error) {
    console.error(error)
    grid.innerHTML = '<div class="loading-state">The catalog could not be loaded. Run the registry build and refresh.</div>'
  }
}

loadCatalog()
