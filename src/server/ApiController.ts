import * as express from "express";
import {ReactPage} from "./ReactPageRenderMiddleware";

export const ApiController = express.Router();

// const dataStore = new InMemoryDataLayer();

function returnJson(res: express.Response, promise: Promise<any>): void {
    promise
        .then(data => res.json(data))
        .catch(err => {
            res.status(500);
            res.json(err);

            console.log(err);
        });
}

ApiController.get("/", (req: express.Request, res: express.Response) => {
    res.render("index", {
        pageName: ReactPage.Landing
    });
});