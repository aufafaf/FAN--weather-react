useEffect(() => {
const timer = setTimeout(() => {
    console.log('hello')
}, 1000)

return () => clearTimeout(timer)
}, [])