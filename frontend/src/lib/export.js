function showComingSoon(format, title) {
  // TODO: Connect export actions to backend document generation.
  const resumeTitle = title?.trim() || 'your resume'
  window.alert(`${format} export is coming soon for ${resumeTitle}.`)
}

export function exportPdf(resume) {
  showComingSoon('PDF', resume?.title)
}

export function exportDocx(resume) {
  showComingSoon('DOCX', resume?.title)
}

export function exportHtml(resume) {
  showComingSoon('HTML', resume?.title)
}

export function exportPng(resume) {
  showComingSoon('PNG', resume?.title)
}
