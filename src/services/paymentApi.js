import API from "@/lib/axios";

export const paymentApi = {
  getTransactions: async (eventId, page = 1, search = "") => {
    const transactionsResponse = await API.get(
      `/payments/transactions/${eventId}?page=${page}&search=${search}`
    );

    return transactionsResponse.data;
  },
  getEventBalance: async eventId => {
    const balanceResponse = await API.get(`/payments/balance/${eventId}`);
    return balanceResponse.data.data;
  },
  withdrawFunds: async (eventId, amount) => {
    const withdrawResponse = await API.post(`/payments/withdraw`, {
      amount,
      eventId,
    });
    return withdrawResponse.data.data;
  },
  verifyBank: async (bankCode, accountNumber) => {
    const verifyResponse = await API.post(`/payments/verify-account`, {
      bankCode,
      accountNumber,
    });
    return verifyResponse.data;
  }

};
