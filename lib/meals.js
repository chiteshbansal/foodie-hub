import sql from "better-sqlite3";
const db = sql("meals.db");
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  //   throw new Error("Failed to fetch meal data!");
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  // avoid this to prevent sql injections
  // return db.prepare("SELECT * FROM meals WHERE slug = " + slug).get();
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });

  // requests will be automatically calls to the public folder  only so we can remove that
  meal.image = `/images/${fileName}`;
  return db
    .prepare(
      `
    INSERT INTO meals
        (title,summary,instructions,creator,creator_email,image,slug)
        VALUES (
          @title,
          @summary,
          @instructions,
          @creator,
          @creator_email,
          @image,
          @slug
          )
          `
    )
    .run(meal);
}
