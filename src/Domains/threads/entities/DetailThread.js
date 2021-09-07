
class DetailThread {
    constructor(payload) {
        this._verifyPayload(payload);

        const { threadId } = payload;
         
      this.threadId = threadId
         
    }

    _verifyPayload({ threadId}) {
        if (!threadId) {
            throw new Error('DETAIL_THREAD_USE_CASE.NOT_CONTAIN_THREAD_ID');
          }
        }

}
module.exports = DetailThread;