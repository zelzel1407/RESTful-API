const api = require("express");
const app = api();
const router = require("./router/routes");
const port = 10799;

app.use(api.json());
app.use("/router", router);

app.listen(port);