//Hacemos una funcion que verifique que seas developer:
export function Developer(req, res, next) {
    if (!req.user) return res.status(401).send({ message: "No autenticado." });
    if(req.user.role !== "developer") return next();
    return res.status(403).send({ message: "Acceso denegado, solo delevoler.." });
}

//Hacemos una funcion que verifique que seas premium:
export function Premium(req, res, next) {
    if (!req.user) return res.status(401).send({ message: "No autenticado." });
    if(req.user.role !== "premium" || req.user.role !== "developer") return next();
    return res.status(403).send({ message: "Acceso denegado, solo usuarios premium.." });
}

//Hacemos una funcion que verifique que seas usuario:
export function Usuario(req, res, next) {
    if (!req.user) return res.status(401).send({ message: "No autenticado." });
    if(req.user.role !== "usuario" || req.user.role !== "premium" || req.user.role !== "developer") return next();
    return res.status(403).send({ message: "Acceso denegado, solo usuarios.." });
}