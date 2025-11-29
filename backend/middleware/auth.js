import jwt from 'jsonwebtoken'

export function authMiddleware(req, res, next) {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
  if (!token) return res.status(401).json({ message: 'Não autenticado' })
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret')
    req.user = { id: payload.sub, email: payload.email, papel: payload.papel }
    next()
  } catch {
    return res.status(401).json({ message: 'Token inválido' })
  }
}