import express, {Request, Response, NextFunction } from "express";
import fs from "node:fs";
import path from "path";
import { userRouter } from "./Module/user/user.route";
import { errorHandler } from "./Error/util/errorHandler";
import { authRouter } from "./Module/auth/auth.routes";
import session from "express-session";
import "dotenv/config"
const app = express();
const port = process.env.PORT || 4000;
const secret = process.env.SESSION_SECRET || "";
const isProduction = process.env.NODE_ENV === "production";

app.use(express.json());

app.use(session({
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: isProduction, maxAge: 24 * 60 * 60}
}))

app.use(express.static(path.join(__dirname, "/pages"), {
    setHeaders: (res: Response) => {
        res.setHeader("cache-control", "public max-age=3600");
    }
}))

app.use("/api/v1/users", userRouter);

app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
    const home = path.join(__dirname, "/pages", "/index.html");
    res.send(home);
})

app.get("/about", (req, res) => {
    const home = path.join(__dirname, "/pages", "/about.html");
    res.send(home);
})

app.get("/products", (req, res) => {
    const home = path.join(__dirname, "/pages", "/products.html");
    res.send(home);
})

app.use((req: Request, res: Response) => {
    const notFound = path.join(__dirname, "/pages", "/404.html");
    if(req.path.startsWith("/api")) {
        return res.status(404).json({
            success: "false",
            cause: "Not Found"
        })
    }
    fs.readFile(notFound, "utf-8", (err, htmlContent) => {
        if(err) {
            return  res
                .status(404)
                .send("Page Not Found")
        }
        else {
            const dynamicHtml = htmlContent.replace(/{{url}}/g, req.path);
            res.status(404).send(dynamicHtml);
        }
    })

})

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, res);
})

app.listen(port, () => {
    console.log("Hello express!")
});