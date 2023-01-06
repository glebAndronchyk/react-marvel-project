const ErrorMessage = () => {
  return (
    <img
      style={{ display: 'block', width:250, height: 250, objectFit: 'contain', margin: '0 auto' }}
      src={process.env.PUBLIC_URL + '/error.gif'}
      alt="Error"
    />
  )
}

export default  ErrorMessage;
