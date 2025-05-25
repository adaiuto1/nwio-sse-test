import express from "express";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.setHeader("Content-Type", "text/event-stream");
	res.setHeader("Cache-Control", "no-cache");
	res.setHeader("Connection", "keep-alive");
	res.flushHeaders(); // send headers immediately

	res.write(`data: Connected to server\n\n`);
	let counter = 0;
	let interValID = setInterval(() => {
		counter++;
		if (counter >= 10) {
			clearInterval(interValID);
			res.end();
			return;
		}
		res.write(`data: ${JSON.stringify({ beersConsumed: counter })}\n\n`); // res.write() instead of res.send()
	}, 1000);
	req.on("close", () => {
		console.log(`Connection closed`);
	});
});

app.listen(3000);
