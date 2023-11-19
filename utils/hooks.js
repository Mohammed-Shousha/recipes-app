import { useState, useEffect } from 'react'

const useFetchRecipes = (url, setRecipes) => {
  const [loading, setLoading] = useState(true)

  const fetchRecipes = async () => {
    const response = await fetch(url)
    const { results } = await response.json()
    setRecipes(results)
    setLoading(false)
  }

  useEffect(() => {
    fetchRecipes()
  }, [url])

  return { loading }
}

export default useFetchRecipes
