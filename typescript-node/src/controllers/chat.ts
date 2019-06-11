import { Request, Response } from "express";

/**
 * GET /
 * Chat page.
 */
export let chat = (req: Request, res: Response) => {
  res.render("chat", {
    title: "Chat Page"
  });
};
