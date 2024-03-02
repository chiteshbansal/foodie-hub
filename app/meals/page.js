import React, { Suspense } from "react";
import classes from "./page.module.css";
import Link from "next/link";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";

export const metadata = {
  title: "All Meals",
  description: "Browse all the Delicious meals shared by community.",
};

async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}
function MealsPage(props) {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created
          <span className={classes.highlight}> by you</span>
        </h1>
        <p>
          Choose your fovourite recipe and cook it yourself, It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share"> Share your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.header}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching Meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}

export default MealsPage;
