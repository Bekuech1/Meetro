import React, { useState } from "react";
import InputModals from "../InputModals";
import PopUpInput from "./Popup components/PopUpInput";
import TextOnlyInput from "./Popup components/TextOnlyInput";
import CreateEventBtn from "@/components/Layout-conponents/CreateEventBtn";

const ChipIn = ({ isVisible, onClose, onSave }) => {
  const [showBank, setShowBank] = useState(false);
  const [showBankList, setShowBankList] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Add missing state variables
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("0.00");

  const banks = [
    { code: "120001", name: "9mobile 9Payment Service Bank" },
    { code: "404", name: "Abbey Mortgage Bank" },
    { code: "51204", name: "Above Only MFB" },
    { code: "51312", name: "Abulesoro MFB" },
    { code: "044", name: "Access Bank" },
    { code: "063", name: "Access Bank (Diamond)" },
    { code: "602", name: "Accion Microfinance Bank" },
    { code: "50315", name: "Aella MFB" },
    { code: "90077", name: "AG Mortgage Bank" },
    { code: "50036", name: "Ahmadu Bello University Microfinance Bank" },
    { code: "120004", name: "Airtel Smartcash PSB" },
    { code: "51336", name: "AKU Microfinance Bank" },
    { code: "090561", name: "Akuchukwu Microfinance Bank Limited" },
    { code: "035A", name: "ALAT by WEMA" },
    { code: "000304", name: "Alternative bank" },
    { code: "090629", name: "Amegy Microfinance Bank" },
    { code: "50926", name: "Amju Unique MFB" },
    { code: "50083", name: "Aramoko MFB" },
    { code: "401", name: "ASO Savings and Loans" },
    { code: "50092", name: "Assets Microfinance Bank" },
    { code: "MFB50094", name: "Astrapolaris MFB LTD" },
    { code: "090478", name: "AVUENEGBE MICROFINANCE BANK" },
    { code: "51351", name: "AWACASH MICROFINANCE BANK" },
    { code: "51337", name: "AZTEC MICROFINANCE BANK LIMITED" },
    { code: "51229", name: "Bainescredit MFB" },
    { code: "50117", name: "Banc Corp Microfinance Bank" },
    { code: "50572", name: "BANKIT MICROFINANCE BANK LTD" },
    { code: "51341", name: "BANKLY MFB" },
    { code: "MFB50992", name: "Baobab Microfinance Bank" },
    { code: "51100", name: "BellBank Microfinance Bank" },
    { code: "51267", name: "Benysta Microfinance Bank Limited" },
    { code: "50123", name: "Beststar Microfinance Bank" },
    { code: "50725", name: "BOLD MFB" },
    { code: "650", name: "Bosak Microfinance Bank" },
    { code: "50931", name: "Bowen Microfinance Bank" },
    { code: "FC40163", name: "Branch International Finance Company Limited" },
    { code: "50645", name: "BuyPower MFB" },
    { code: "565", name: "Carbon" },
    { code: "51353", name: "Cashbridge Microfinance Bank Limited" },
    { code: "865", name: "CASHCONNECT MFB" },
    { code: "50823", name: "CEMCS Microfinance Bank" },
    { code: "50171", name: "Chanelle Microfinance Bank Limited" },
    { code: "312", name: "Chikum Microfinance bank" },
    { code: "023", name: "Citibank Nigeria" },
    { code: "070027", name: "CITYCODE MORTAGE BANK" },
    { code: "50910", name: "Consumer Microfinance Bank" },
    { code: "50204", name: "Corestep MFB" },
    { code: "559", name: "Coronation Merchant Bank" },
    { code: "FC40128", name: "County Finance Limited" },
    { code: "40119", name: "Credit Direct Limited" },
    { code: "51297", name: "Crescent MFB" },
    { code: "090560", name: "Crust Microfinance Bank" },
    { code: "50216", name: "CRUTECH MICROFINANCE BANK LTD" },
    { code: "51334", name: "Davenport MICROFINANCE BANK" },
    { code: "50162", name: "Dot Microfinance Bank" },
    { code: "50922", name: "EBSU Microfinance Bank" },
    { code: "050", name: "Ecobank Nigeria" },
    { code: "50263", name: "Ekimogun MFB" },
    { code: "098", name: "Ekondo Microfinance Bank" },
    { code: "090678", name: "EXCEL FINANCE BANK" },
    { code: "50126", name: "Eyowo" },
    { code: "51318", name: "Fairmoney Microfinance Bank" },
    { code: "50298", name: "Fedeth MFB" },
    { code: "070", name: "Fidelity Bank" },
    { code: "51314", name: "Firmus MFB" },
    { code: "011", name: "First Bank of Nigeria" },
    { code: "214", name: "First City Monument Bank" },
    { code: "090164", name: "FIRST ROYAL MICROFINANCE BANK" },
    { code: "51333", name: "FIRSTMIDAS MFB" },
    { code: "413", name: "FirstTrust Mortgage Bank Nigeria" },
    { code: "501", name: "FSDH Merchant Bank Limited" },
    { code: "832", name: "FUTMINNA MICROFINANCE BANK" },
    { code: "MFB51093", name: "Garun Mallam MFB" },
    { code: "812", name: "Gateway Mortgage Bank LTD" },
    { code: "00103", name: "Globus Bank" },
    { code: "090574", name: "Goldman MFB" },
    { code: "100022", name: "GoMoney" },
    { code: "090664", name: "GOOD SHEPHERD MICROFINANCE BANK" },
    { code: "50739", name: "Goodnews Microfinance Bank" },
    { code: "562", name: "Greenwich Merchant Bank" },
    { code: "51276", name: "GROOMING MICROFINANCE BANK" },
    { code: "50368", name: "GTI MFB" },
    { code: "058", name: "Guaranty Trust Bank" },
    { code: "51251", name: "Hackman Microfinance Bank" },
    { code: "50383", name: "Hasal Microfinance Bank" },
    { code: "120002", name: "HopePSB" },
    { code: "51211", name: "IBANK Microfinance Bank" },
    { code: "51279", name: "IBBU MFB" },
    { code: "51244", name: "Ibile Microfinance Bank" },
    { code: "50439", name: "Ikoyi Osun MFB" },
    { code: "50442", name: "Ilaro Poly Microfinance Bank" },
    { code: "50453", name: "Imowo MFB" },
    { code: "415", name: "IMPERIAL HOMES MORTAGE BANK" },
    { code: "50457", name: "Infinity MFB" },
    { code: "070016", name: "Infinity trust  Mortgage Bank" },
    { code: "090701", name: "ISUA MFB" },
    { code: "301", name: "Jaiz Bank" },
    { code: "50502", name: "Kadpoly MFB" },
    { code: "51308", name: "KANOPOLY MFB" },
    { code: "082", name: "Keystone Bank" },
    { code: "899", name: "Kolomoni MFB" },
    {
      code: "100025",
      name: "KONGAPAY (Kongapay Technologies Limited)(formerly Zinternet)",
    },
    { code: "50200", name: "Kredi Money MFB LTD" },
    { code: "50211", name: "Kuda Bank" },
    { code: "90052", name: "Lagos Building Investment Company Plc." },
    { code: "090420", name: "Letshego Microfinance Bank" },
    { code: "50549", name: "Links MFB" },
    { code: "031", name: "Living Trust Mortgage Bank" },
    { code: "50491", name: "LOMA MFB" },
    { code: "303", name: "Lotus Bank" },
    { code: "090171", name: "MAINSTREET MICROFINANCE BANK" },
    { code: "50563", name: "Mayfair MFB" },
    { code: "50304", name: "Mint MFB" },
    { code: "946", name: "Money Master PSB" },
    { code: "50515", name: "Moniepoint MFB" },
    { code: "120003", name: "MTN Momo PSB" },
    { code: "090190", name: "MUTUAL BENEFITS MICROFINANCE BANK" },
    { code: "090679", name: "NDCC MICROFINANCE BANK" },
    { code: "51361", name: "NET MICROFINANCE BANK" },
    { code: "51142", name: "Nigerian Navy Microfinance Bank Limited" },
    { code: "50072", name: "Nombank MFB" },
    { code: "561", name: "NOVA BANK" },
    { code: "51371", name: "Novus MFB" },
    { code: "50629", name: "NPF MICROFINANCE BANK" },
    { code: "51261", name: "NSUK MICROFINANACE BANK" },
    { code: "50697", name: "OLUCHUKWU MICROFINANCE BANK LTD" },
    { code: "999992", name: "OPay Digital Services Limited (OPay)" },
    { code: "107", name: "Optimus Bank Limited" },
    { code: "100002", name: "Paga" },
    { code: "999991", name: "PalmPay" },
    { code: "104", name: "Parallex Bank" },
    { code: "311", name: "Parkway - ReadyCash" },
    { code: "090680", name: "PATHFINDER MICROFINANCE BANK LIMITED" },
    { code: "100039", name: "Paystack-Titan" },
    { code: "50743", name: "Peace Microfinance Bank" },
    { code: "51226", name: "PECANTRUST MICROFINANCE BANK LIMITED" },
    { code: "51146", name: "Personal Trust MFB" },
    { code: "50746", name: "Petra Mircofinance Bank Plc" },
    { code: "MFB51452", name: "Pettysave MFB" },
    { code: "050021", name: "PFI FINANCE COMPANY LIMITED" },
    { code: "268", name: "Platinum Mortgage Bank" },
    { code: "00716", name: "Pocket App" },
    { code: "076", name: "Polaris Bank" },
    { code: "50864", name: "Polyunwana MFB" },
    { code: "105", name: "PremiumTrust Bank" },
    { code: "50739", name: "Prospa Capital Microfinance Bank" },
    { code: "050023", name: "PROSPERIS FINANCE LIMITED" },
    { code: "101", name: "Providus Bank" },
    { code: "51293", name: "QuickFund MFB" },
    { code: "502", name: "Rand Merchant Bank" },
    { code: "090496", name: "RANDALPHA MICROFINANCE BANK" },
    { code: "90067", name: "Refuge Mortgage Bank" },
    { code: "50761", name: "REHOBOTH MICROFINANCE BANK" },
    { code: "50994", name: "Rephidim Microfinance Bank" },
    { code: "51286", name: "Rigo Microfinance Bank Limited" },
    { code: "50767", name: "ROCKSHIELD MICROFINANCE BANK" },
    { code: "125", name: "Rubies MFB" },
    { code: "51113", name: "Safe Haven MFB" },
    { code: "40165", name: "SAGE GREY FINANCE LIMITED" },
    { code: "50582", name: "Shield MFB" },
    { code: "106", name: "Signature Bank Ltd" },
    { code: "51062", name: "Solid Allianze MFB" },
    { code: "50800", name: "Solid Rock MFB" },
    { code: "51310", name: "Sparkle Microfinance Bank" },
    { code: "221", name: "Stanbic IBTC Bank" },
    { code: "068", name: "Standard Chartered Bank" },
    { code: "090162", name: "STANFORD MICROFINANCE BANK" },
    { code: "50809", name: "STATESIDE MICROFINANCE BANK" },
    { code: "070022", name: "STB Mortgage Bank" },
    { code: "51253", name: "Stellas MFB" },
    { code: "232", name: "Sterling Bank" },
    { code: "100", name: "Suntrust Bank" },
    { code: "50968", name: "Supreme MFB" },
    { code: "302", name: "TAJ Bank" },
    { code: "51269", name: "Tangerine Money" },
    { code: "51403", name: "TENN" },
    { code: "102", name: "Titan Bank" },
    { code: "090708", name: "TransPay MFB" },
    { code: "50840", name: "U&C Microfinance Bank Ltd (U AND C MFB)" },
    { code: "090706", name: "UCEE MFB" },
    { code: "51322", name: "Uhuru MFB" },
    { code: "51080", name: "Ultraviolet Microfinance Bank" },
    { code: "50870", name: "Unaab Microfinance Bank Limited" },
    { code: "50871", name: "Unical MFB" },
    { code: "51316", name: "Unilag Microfinance Bank" },
    { code: "50875", name: "UNIMAID MICROFINANCE BANK" },
    { code: "032", name: "Union Bank of Nigeria" },
    { code: "033", name: "United Bank For Africa" },
    { code: "215", name: "Unity Bank" },
    { code: "50894", name: "Uzondu Microfinance Bank Awka Anambra State" },
    { code: "050020", name: "Vale Finance Limited" },
    { code: "566", name: "VFD Microfinance Bank Limited" },
    { code: "51355", name: "Waya Microfinance Bank" },
    { code: "035", name: "Wema Bank" },
    { code: "51386", name: "Weston Charis MFB" },
    { code: "100040", name: "Xpress Wallet" },
    { code: "594", name: "Yes MFB" },
    { code: "057", name: "Zenith Bank" },
  ];

  // Filter banks based on search input
  const filteredBanks = banks.filter((bank) =>
    bank.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleBankSelect = (name) => {
    setSelectedBank(name);
    setSearchInput(name);
    setShowBankList(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setSelectedBank("");
    setShowBankList(true);
  };

  const handleInputFocus = () => {
    setShowBankList(true);
  };

  // Handle saving bank details
  const handleSaveBankDetails = () => {
    if (selectedBank && accountNumber && accountName) {
      setShowBank(false);
      // You might want to show a success message or update the display
    } else {
      // Handle validation - show error message
      alert("Please fill in all bank details");
    }
  };

  const handleAmountChange = (e) => {
    let input = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    if (input === "") {
      setAmount("0.00");
      return;
    }
    input = parseInt(input, 10); // Convert to number
    const formatted = (input / 100).toFixed(2); // Format as currency
    setAmount(formatted);
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        selectedBank,
        accountNumber,
        accountName,
      });
    }
    onClose();
  };

  if (!isVisible) return null;

  if (showBank) {
    return (
      <div className="fixed inset-0 h-screen flex items-center justify-center z-30 bg-[#00000080]/50 backdrop-blur-[4px]">
        <div className="md:w-[432px] h-fit flex flex-col justify-center items-center relative rounded-4xl">
          <div className="bg-white px-6 py-3 text-left w-full h-fit rounded-t-4xl">
            <h1 className="satoshi font-[700] text-[20px] capitalize text-black">
              add bank details
            </h1>
          </div>
          <div className="w-full px-6 py-3 rounded-b-4xl bg-gray-100">
            <div className="grid gap-4 mb-8">
              <div className="w-full h-fit satoshi grid gap-1 relative">
                <label className="text-[10px] font-bold text-[#8A9191] capitalize">
                  account number
                </label>
                <div className="w-full h-fit bg-[#FFFFFE]/50 flex pr-2 pl-4 py-3 rounded-[12px] border border-white cursor-pointer">
                  <input
                    type="text" // Use text for better control over maxLength
                    value={accountNumber}
                    maxLength={10} // Restrict to 10 characters
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow only numeric input
                      if (/^\d*$/.test(value)) {
                        setAccountNumber(value);
                      }
                    }}
                    placeholder="Account Number"
                    className="w-full h-fit leading-tight text-sm font-medium satoshi capitalize text-black bg-transparent outline-none placeholder:text-[#8A9191]"
                  />
                </div>
              </div>
              <div className="w-full h-fit satoshi grid gap-1 relative">
                <label className="text-[10px] font-bold text-[#8A9191] capitalize">
                  bank name
                </label>
                <div
                  className="w-full h-fit bg-[#FFFFFE]/50 flex pr-2 pl-4 py-3 rounded-[12px] border border-white cursor-pointer"
                  onClick={() => setShowBankList((prev) => !prev)}
                >
                  <input
                    type="text"
                    value={searchInput}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    placeholder="select bank"
                    className="w-full h-fit leading-tight text-sm font-medium satoshi capitalize text-black bg-transparent outline-none placeholder:text-[#8A9191]"
                  />
                  <img src="arrow-down-gray.svg" alt="" />
                </div>
                {showBankList && (
                  <ul className="absolute bg-white border rounded-[12px] shadow-lg top-[68px] -right-0 w-full z-10 text-center max-h-[164px] h-fit py-1 overflow-y-auto scrollbar-hide scroll-smooth">
                    {filteredBanks.map(({ name, code }) => (
                      <li
                        key={code}
                        className="flex items-center px-4 py-2 cursor-pointer hover:scale-105 transition-transform justify-center font-medium text-[14px] capitalize"
                        onClick={() => handleBankSelect(name)}
                      >
                        <span
                          className={`cursor-pointer rounded-md flex justify-center transition text-[16px] satoshi ${
                            name === selectedBank
                              ? "text-black font-[600]"
                              : "text-[#8A9191] font-medium"
                          }`}
                        >
                          {name}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#E2E2E2] mb-4"></div>
            <div className="flex justify-center items-center gap-4 w-full">
              <CreateEventBtn
                text="cancel"
                onClick={() => setShowBank(false)}
                textcolor="text-[#000000]"
                bgcolor="bg-[#FFFFFE]"
              />
              <CreateEventBtn
                text="save"
                onClick={handleSaveBankDetails}
                textcolor="text-[#AEFC40]"
                bgcolor="bg-[#011F0F]"
              />
            </div>
          </div>
        </div>
        <img
          src="closePopup.svg"
          alt="close popup"
          className="h-12 w-12 absolute md:-top-10 -top-14 md:left-[99%] left-[90%] cursor-pointer"
          onClick={onClose}
        />
      </div>
    );
  }

  return (
    <InputModals
      isVisible={isVisible}
      onClose={onClose}
      title="chip in"
      onSave={handleSave}
      text1="Fixed"
      text2="Target Goal"
      text3="As the Spirit leads"
    >
      {[
        <div key="1">
          <Content
            label="price"
            header="You choose a fixed amount each guest must contribute to attend. It's like a mini ticket, but more casual."
            showBank={() => setShowBank(true)}
            bankName={selectedBank}
            accNo={accountNumber}
            onAmountChange={handleAmountChange}
            amountValue={amount}
          />
        </div>,
        <div key="2">
          <Content
            label="target goal"
            header="You set a total amount you want to raise, and everyone can chip in to help reach it. It's like a group gift!"
            showBank={() => setShowBank(true)}
            bankName={selectedBank}
            accNo={accountNumber}
            onAmountChange={handleAmountChange}
            amountValue={amount}
          />
        </div>,
        <div key="3">
          <Content
            label="minimum amount"
            header="No pressure! Guests contribute whatever they feel like. It's all about the spirit of giving."
            showBank={() => setShowBank(true)}
            bankName={selectedBank}
            accNo={accountNumber}
            onAmountChange={handleAmountChange}
            amountValue={amount}
          />
        </div>,
      ]}
    </InputModals>
  );
};

const Content = ({
  label,
  header,
  showBank,
  accNo,
  bankName,
  amountValue,
  onAmountChange,
}) => {
  return (
    <div className="gap-4 grid w-full h-fit">
      <p className="text-[#8A9191] satoshi font-medium text-sm">{header}</p>
      <PopUpInput
        leftIcon="bank.svg"
        rounded="rounded-[12px]"
        placeholder={bankName || "Select Bank"}
        rightIcon="arrow-right.svg"
        onClick={showBank}
        secondary={accNo}
      />
      <div className="w-full h-fit bg-[#FFFFFE]/50 flex p-2 items-center rounded-[12px] border border-white cursor-pointer">
        <span className="text-gray-500 size-fit mr-2">
          <div className="bg-white p-1 rounded-4xl size-fit">
            <img src="naira.svg" alt="Left Icon" className="size-4" />
          </div>
        </span>
        <input
          type="text"
          value={amountValue}
          onChange={onAmountChange}
          placeholder="0.00"
          className="w-full h-fit leading-tight text-sm font-medium satoshi capitalize bg-transparent outline-none placeholder:text-gray-500  text-black"
        />
      </div>

      <div className="grid text-center p-2 gap-2 rounded-[12px] border-[#D9D1F1] border bg-[#F3F0FB] text-[#7A60BF] satoshi items-center w-full cursor-pointer">
        <h5 className="text-base font-bold">✏️ Heads up, Creator!</h5>
        <p className="text-sm font-medium">
          You can only withdraw after the event to ensure refunding is possible
          if the event is canceled
        </p>
      </div>
    </div>
  );
};

export default ChipIn;
