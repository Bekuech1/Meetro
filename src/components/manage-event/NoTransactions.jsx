import TransactionIcon from "@/assets/icons/TransactionIcon";

function NoTransactions({
  title = "No transactions found",
  description = "No transactions yet? Spread the word or post the event link to get your guest list growing!",
  children,
}) {
  return (
    <div className="p-6 rounded-3xl border border-white bg-[#FFFFFF]/50">
      <div className="flex flex-col satoshi mx-auto max-w-105 text-center items-center w-full">
        <TransactionIcon />
        <h3 className="font-bold text-base sm:text-lg sm:leading-7 text-[#001010] mb-2 mt-4">
          {title}
        </h3>
        <p className="mb-4 text-sm sm:text-base text-[#8A9191] font-medium">
          {description}
        </p>
        {children && children}
      </div>
    </div>
  );
}

export default NoTransactions;
