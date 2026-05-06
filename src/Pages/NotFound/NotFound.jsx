
const NotFound = () => {

  return (
    <div className='h-screen flex justify-center items-center flex-col gap-4'>
      <h1 className='text-5xl text-red-700'>404 NotFound</h1>
      <button class="btn btn-outline btn-error" onClick={()=>{window.history.back();}}>Back</button>
    </div>
  )
}

export default NotFound
