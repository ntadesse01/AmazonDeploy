import React from 'react'
import { CategoryInfos } from './catagoryFullInfo'
import CategoryCard from './CategoryCard'
import classes from './catagory.module.css'

function Category() {
  return (
      <section className={classes.category__container}>
      {
        CategoryInfos.map((info) => (
          <CategoryCard key={info.id} data={info} />
        ))
      }
    </section>
  )
}

export default Category
