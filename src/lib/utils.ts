const fileNameRegex = new RegExp(
  /^[a-zA-Z0-9\s$%!'"#&\-_@()^{}~+,;=\[\].]+$|^(?!^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$)[^\x00-\x1f\\:*?"<>|]+$/,
  'gi'
)

export { fileNameRegex }
