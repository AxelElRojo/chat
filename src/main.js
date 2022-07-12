import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import http from "http";
import express from "express";
import ejs from "ejs";
import { WebSocketServer } from "ws";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
	path: path.join(__dirname, ".env")
});

const httpSrv = http.createServer({
	port: process.env.PORT,
	perMessageDeflate: false
});
const app = express();
const wsSrv = new WebSocketServer({
	server: httpSrv
});

app.use(express.json());
app.use('/', express.static(path.join(__dirname, "public")));
app.get('/', (req, res) => {
	ejs.renderFile(path.join(__dirname, "views", "index.ejs"), (err, str) => {
		if(err == null)
			res.send(str);
		else
			res.send(err);
	});
});

wsSrv.on("connection", (ws) => {
	ws.on("message", (msg) => {
		wsSrv.clients.forEach((client) => {
			client.send(msg.toString());
		});
	});
});
httpSrv.on("request", app);

const listener = httpSrv.listen(process.env.PORT, () => {
	console.log("Listening on " + listener.address().address + listener.address().port);
});