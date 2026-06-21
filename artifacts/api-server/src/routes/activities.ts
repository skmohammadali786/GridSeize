import { Router, type IRouter } from "express";
import { db, activitiesTable } from "@workspace/db";
import { insertActivitySchema } from "@workspace/db/schema";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/activities", async (_req, res) => {
  try {
    const rows = await db
      .select()
      .from(activitiesTable)
      .orderBy(desc(activitiesTable.completedAt));
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch activities" });
  }
});

router.post("/activities", async (req, res) => {
  const parsed = insertActivitySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  try {
    const [row] = await db.insert(activitiesTable).values(parsed.data).returning();
    res.status(201).json(row);
  } catch (err) {
    res.status(500).json({ error: "Failed to save activity" });
  }
});

export default router;
