
class Wrapper {
  response(res, status, data) {
    res.status(status).json(data)
    res.end()
  }

  responseError(res, classError) {
    res.status(classError.code).json({
      success: false,
      code: classError.code,
      message: classError.message,
      data: classError.data,
      meta: classError.meta
    })
    res.end()
  }
}

module.exports = Wrapper