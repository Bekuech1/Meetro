import React, { useState, useEffect } from "react";
import CreateEventBtn from "../Layout-conponents/CreateEventBtn";
import When from "./PopUps/When";
import Where from "./PopUps/Where";
import Host from "./PopUps/Host";
import Description from "./PopUps/Description";
import DressCode from "./PopUps/DressCode";
import ChipIn from "./PopUps/ChipIn";
import ImageModal from "./PopUps/ImageModal";
import Preview from "./Preview";
import EventType from "./PopUps/EventType";
import axios from "axios";

// Default image sources array (should match the one in ImageModal)
const imageSources = [
  "/event-ph1.png",
  "/event-ph2.jpg",
  "/event-ph3.jpg",
  "/event-ph4.jpg",
  "/event-ph5.jpg",
  "/event-ph6.jpg",
  "/event-ph7.jpg",
];

// Bank data array
const banks = [
  {"code": "120001", "name": "9mobile 9Payment Service Bank"},
  {"code": "404", "name": "Abbey Mortgage Bank"},
  {"code": "51204", "name": "Above Only MFB"},
  {"code": "51312", "name": "Abulesoro MFB"},
  {"code": "044", "name": "Access Bank"},
  {"code": "063", "name": "Access Bank (Diamond)"},
  {"code": "602", "name": "Accion Microfinance Bank"},
  {"code": "50315", "name": "Aella MFB"},
  {"code": "90077", "name": "AG Mortgage Bank"},
  {"code": "50036", "name": "Ahmadu Bello University Microfinance Bank"},
  {"code": "120004", "name": "Airtel Smartcash PSB"},
  {"code": "51336", "name": "AKU Microfinance Bank"},
  {"code": "090561", "name": "Akuchukwu Microfinance Bank Limited"},
  {"code": "035A", "name": "ALAT by WEMA"},
  {"code": "000304", "name": "Alternative bank"},
  {"code": "090629", "name": "Amegy Microfinance Bank"},
  {"code": "50926", "name": "Amju Unique MFB"},
  {"code": "50083", "name": "Aramoko MFB"},
  {"code": "401", "name": "ASO Savings and Loans"},
  {"code": "50092", "name": "Assets Microfinance Bank"},
  {"code": "MFB50094", "name": "Astrapolaris MFB LTD"},
  {"code": "090478", "name": "AVUENEGBE MICROFINANCE BANK"},
  {"code": "51351", "name": "AWACASH MICROFINANCE BANK"},
  {"code": "51337", "name": "AZTEC MICROFINANCE BANK LIMITED"},
  {"code": "51229", "name": "Bainescredit MFB"},
  {"code": "50117", "name": "Banc Corp Microfinance Bank"},
  {"code": "50572", "name": "BANKIT MICROFINANCE BANK LTD"},
  {"code": "51341", "name": "BANKLY MFB"},
  {"code": "MFB50992", "name": "Baobab Microfinance Bank"},
  {"code": "51100", "name": "BellBank Microfinance Bank"},
  {"code": "51267", "name": "Benysta Microfinance Bank Limited"},
  {"code": "50123", "name": "Beststar Microfinance Bank"},
  {"code": "50725", "name": "BOLD MFB"},
  {"code": "650", "name": "Bosak Microfinance Bank"},
  {"code": "50931", "name": "Bowen Microfinance Bank"},
  {"code": "FC40163", "name": "Branch International Finance Company Limited"},
  {"code": "50645", "name": "BuyPower MFB"},
  {"code": "565", "name": "Carbon"},
  {"code": "51353", "name": "Cashbridge Microfinance Bank Limited"},
  {"code": "865", "name": "CASHCONNECT MFB"},
  {"code": "50823", "name": "CEMCS Microfinance Bank"},
  {"code": "50171", "name": "Chanelle Microfinance Bank Limited"},
  {"code": "312", "name": "Chikum Microfinance bank"},
  {"code": "023", "name": "Citibank Nigeria"},
  {"code": "070027", "name": "CITYCODE MORTAGE BANK"},
  {"code": "50910", "name": "Consumer Microfinance Bank"},
  {"code": "50204", "name": "Corestep MFB"},
  {"code": "559", "name": "Coronation Merchant Bank"},
  {"code": "FC40128", "name": "County Finance Limited"},
  {"code": "40119", "name": "Credit Direct Limited"},
  {"code": "51297", "name": "Crescent MFB"},
  {"code": "090560", "name": "Crust Microfinance Bank"},
  {"code": "50216", "name": "CRUTECH MICROFINANCE BANK LTD"},
  {"code": "51334", "name": "Davenport MICROFINANCE BANK"},
  {"code": "50162", "name": "Dot Microfinance Bank"},
  {"code": "50922", "name": "EBSU Microfinance Bank"},
  {"code": "050", "name": "Ecobank Nigeria"},
  {"code": "50263", "name": "Ekimogun MFB"},
  {"code": "098", "name": "Ekondo Microfinance Bank"},
  {"code": "090678", "name": "EXCEL FINANCE BANK"},
  {"code": "50126", "name": "Eyowo"},
  {"code": "51318", "name": "Fairmoney Microfinance Bank"},
  {"code": "50298", "name": "Fedeth MFB"},
  {"code": "070", "name": "Fidelity Bank"},
  {"code": "51314", "name": "Firmus MFB"},
  {"code": "011", "name": "First Bank of Nigeria"},
  {"code": "214", "name": "First City Monument Bank"},
  {"code": "090164", "name": "FIRST ROYAL MICROFINANCE BANK"},
  {"code": "51333", "name": "FIRSTMIDAS MFB"},
  {"code": "413", "name": "FirstTrust Mortgage Bank Nigeria"},
  {"code": "501", "name": "FSDH Merchant Bank Limited"},
  {"code": "832", "name": "FUTMINNA MICROFINANCE BANK"},
  {"code": "MFB51093", "name": "Garun Mallam MFB"},
  {"code": "812", "name": "Gateway Mortgage Bank LTD"},
  {"code": "00103", "name": "Globus Bank"},
  {"code": "090574", "name": "Goldman MFB"},
  {"code": "100022", "name": "GoMoney"},
  {"code": "090664", "name": "GOOD SHEPHERD MICROFINANCE BANK"},
  {"code": "50739", "name": "Goodnews Microfinance Bank"},
  {"code": "562", "name": "Greenwich Merchant Bank"},
  {"code": "51276", "name": "GROOMING MICROFINANCE BANK"},
  {"code": "50368", "name": "GTI MFB"},
  {"code": "058", "name": "Guaranty Trust Bank"},
  {"code": "51251", "name": "Hackman Microfinance Bank"},
  {"code": "50383", "name": "Hasal Microfinance Bank"},
  {"code": "120002", "name": "HopePSB"},
  {"code": "51211", "name": "IBANK Microfinance Bank"},
  {"code": "51279", "name": "IBBU MFB"},
  {"code": "51244", "name": "Ibile Microfinance Bank"},
  {"code": "50439", "name": "Ikoyi Osun MFB"},
  {"code": "50442", "name": "Ilaro Poly Microfinance Bank"},
  {"code": "50453", "name": "Imowo MFB"},
  {"code": "415", "name": "IMPERIAL HOMES MORTAGE BANK"},
  {"code": "50457", "name": "Infinity MFB"},
  {"code": "070016", "name": "Infinity trust  Mortgage Bank"},
  {"code": "090701", "name": "ISUA MFB"},
  {"code": "301", "name": "Jaiz Bank"},
  {"code": "50502", "name": "Kadpoly MFB"},
  {"code": "51308", "name": "KANOPOLY MFB"},
  {"code": "082", "name": "Keystone Bank"},
  {"code": "899", "name": "Kolomoni MFB"},
  {"code": "100025", "name": "KONGAPAY (Kongapay Technologies Limited)(formerly Zinternet)"},
  {"code": "50200", "name": "Kredi Money MFB LTD"},
  {"code": "50211", "name": "Kuda Bank"},
  {"code": "90052", "name": "Lagos Building Investment Company Plc."},
  {"code": "090420", "name": "Letshego Microfinance Bank"},
  {"code": "50549", "name": "Links MFB"},
  {"code": "031", "name": "Living Trust Mortgage Bank"},
  {"code": "50491", "name": "LOMA MFB"},
  {"code": "303", "name": "Lotus Bank"},
  {"code": "090171", "name": "MAINSTREET MICROFINANCE BANK"},
  {"code": "50563", "name": "Mayfair MFB"},
  {"code": "50304", "name": "Mint MFB"},
  {"code": "946", "name": "Money Master PSB"},
  {"code": "50515", "name": "Moniepoint MFB"},
  {"code": "120003", "name": "MTN Momo PSB"},
  {"code": "090190", "name": "MUTUAL BENEFITS MICROFINANCE BANK"},
  {"code": "090679", "name": "NDCC MICROFINANCE BANK"},
  {"code": "51361", "name": "NET MICROFINANCE BANK"},
  {"code": "51142", "name": "Nigerian Navy Microfinance Bank Limited"},
  {"code": "50072", "name": "Nombank MFB"},
  {"code": "561", "name": "NOVA BANK"},
  {"code": "51371", "name": "Novus MFB"},
  {"code": "50629", "name": "NPF MICROFINANCE BANK"},
  {"code": "51261", "name": "NSUK MICROFINANACE BANK"},
  {"code": "50697", "name": "OLUCHUKWU MICROFINANCE BANK LTD"},
  {"code": "999992", "name": "OPay Digital Services Limited (OPay)"},
  {"code": "107", "name": "Optimus Bank Limited"},
  {"code": "100002", "name": "Paga"},
  {"code": "999991", "name": "PalmPay"},
  {"code": "104", "name": "Parallex Bank"},
  {"code": "311", "name": "Parkway - ReadyCash"},
  {"code": "090680", "name": "PATHFINDER MICROFINANCE BANK LIMITED"},
  {"code": "100039", "name": "Paystack-Titan"},
  {"code": "50743", "name": "Peace Microfinance Bank"},
  {"code": "51226", "name": "PECANTRUST MICROFINANCE BANK LIMITED"},
  {"code": "51146", "name": "Personal Trust MFB"},
  {"code": "50746", "name": "Petra Mircofinance Bank Plc"},
  {"code": "MFB51452", "name": "Pettysave MFB"},
  {"code": "050021", "name": "PFI FINANCE COMPANY LIMITED"},
  {"code": "268", "name": "Platinum Mortgage Bank"},
  {"code": "00716", "name": "Pocket App"},
  {"code": "076", "name": "Polaris Bank"},
  {"code": "50864", "name": "Polyunwana MFB"},
  {"code": "105", "name": "PremiumTrust Bank"},
  {"code": "50739", "name": "Prospa Capital Microfinance Bank"},
  {"code": "050023", "name": "PROSPERIS FINANCE LIMITED"},
  {"code": "101", "name": "Providus Bank"},
  {"code": "51293", "name": "QuickFund MFB"},
  {"code": "502", "name": "Rand Merchant Bank"},
  {"code": "090496", "name": "RANDALPHA MICROFINANCE BANK"},
  {"code": "90067", "name": "Refuge Mortgage Bank"},
  {"code": "50761", "name": "REHOBOTH MICROFINANCE BANK"},
  {"code": "50994", "name": "Rephidim Microfinance Bank"},
  {"code": "51286", "name": "Rigo Microfinance Bank Limited"},
  {"code": "50767", "name": "ROCKSHIELD MICROFINANCE BANK"},
  {"code": "125", "name": "Rubies MFB"},
  {"code": "51113", "name": "Safe Haven MFB"},
  {"code": "40165", "name": "SAGE GREY FINANCE LIMITED"},
  {"code": "50582", "name": "Shield MFB"},
  {"code": "106", "name": "Signature Bank Ltd"},
  {"code": "51062", "name": "Solid Allianze MFB"},
  {"code": "50800", "name": "Solid Rock MFB"},
  {"code": "51310", "name": "Sparkle Microfinance Bank"},
  {"code": "221", "name": "Stanbic IBTC Bank"},
  {"code": "068", "name": "Standard Chartered Bank"},
  {"code": "090162", "name": "STANFORD MICROFINANCE BANK"},
  {"code": "50809", "name": "STATESIDE MICROFINANCE BANK"},
  {"code": "070022", "name": "STB Mortgage Bank"},
  {"code": "51253", "name": "Stellas MFB"},
  {"code": "232", "name": "Sterling Bank"},
  {"code": "100", "name": "Suntrust Bank"},
  {"code": "50968", "name": "Supreme MFB"},
  {"code": "302", "name": "TAJ Bank"},
  {"code": "51269", "name": "Tangerine Money"},
  {"code": "51403", "name": "TENN"},
  {"code": "102", "name": "Titan Bank"},
  {"code": "090708", "name": "TransPay MFB"},
  {"code": "50840", "name": "U&C Microfinance Bank Ltd (U AND C MFB)"},
  {"code": "090706", "name": "UCEE MFB"},
  {"code": "51322", "name": "Uhuru MFB"},
  {"code": "51080", "name": "Ultraviolet Microfinance Bank"},
  {"code": "50870", "name": "Unaab Microfinance Bank Limited"},
  {"code": "50871", "name": "Unical MFB"},
  {"code": "51316", "name": "Unilag Microfinance Bank"},
  {"code": "50875", "name": "UNIMAID MICROFINANCE BANK"},
  {"code": "032", "name": "Union Bank of Nigeria"},
  {"code": "033", "name": "United Bank For Africa"},
  {"code": "215", "name": "Unity Bank"},
  {"code": "50894", "name": "Uzondu Microfinance Bank Awka Anambra State"},
  {"code": "050020", "name": "Vale Finance Limited"},
  {"code": "566", "name": "VFD Microfinance Bank Limited"},
  {"code": "51355", "name": "Waya Microfinance Bank"},
  {"code": "035", "name": "Wema Bank"},
  {"code": "51386", "name": "Weston Charis MFB"},
  {"code": "100040", "name": "Xpress Wallet"},
  {"code": "594", "name": "Yes MFB"},
  {"code": "057", "name": "Zenith Bank"}
];

const Grid = ({ children, title, buttom }) => {
  return (
    <div className="grid w-full h-fit gap-3">
      <h4 className="text-black text-[14px] font-[700] leading-[20px] satoshi capitalize">
        {title}
      </h4>
      {children}
      <div className="flex gap-4 w-full">{buttom}</div>
    </div>
  );
};

const Input = ({
  leftImgSrc,
  text,
  onClickRight,
  onClick,
  rightImg,
  showDropdown,
  edit,
  remove,
  className,
}) => {
  return (
    <div
      className="flex justify-between p-3 gap-4 rounded-[12px] bg-white/50 border border-white items-center w-full cursor-pointer relative"
      onClick={onClick}>
      {/* Left Image */}
      <div className="bg-white p-1 rounded-4xl size-fit">
        <img src={leftImgSrc} alt="" className="w-5 h-4" />
      </div>

      {/* Middle Text */}
      <div
        className={`text-left w-full ${className} font-medium text-[14px] capitalize satoshi`}>
        {text}
      </div>

      {/* Right Image */}
      {rightImg && (
        <div className="grid h-fit w-fit relative">
          <img
            src={rightImg}
            alt="Right Icon"
            className="size-4 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onClickRight && onClickRight(e);
            }}
          />
          {showDropdown && (
            <div className="absolute w-[100px] grid h-fit top-6 -right-4 bg-white z-40 px-4 gap-4 py-2 rounded-[8px] text-left satoshi shadow-lg border">
              <p
                className="text-sm font-medium text-black hover:scale-110 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  edit && edit();
                }}>
                Edit
              </p>
              <p
                className="text-sm font-medium text-black hover:scale-110 hover:text-red-500 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  remove && remove();
                }}>
                Remove
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Add = ({ title, onOptionClick }) => {
  return (
    <div
      className="py-2 px-3 flex md:gap-2 w-fit gap-1 bg-white/80 rounded-[20px] size-fit border border-white justify-center items-center cursor-pointer"
      onClick={onOptionClick}>
      <img src="/add.svg" alt="" className="size-4" />
      <h6 className="font-bold text-black text-[12px] capitalize satoshi">
        {title}
      </h6>
    </div>
  );
};

const Private = ({ onPublic }) => {
  // Basic state
  const [eventName, setEventName] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [eventData, setEventData] = useState({});
  const [hostName, setHostName] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [descriptionDisplay, setDescriptionDisplay] = useState("");
  const [dressCode, setDressCode] = useState("");
  const [location, setLocation] = useState("");
  const [locationType, setLocationType] = useState("");
  const [state, setState] = useState("");
  const [amount, setAmount] = useState("");
  const [chipInType, setChipInType] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Modal states
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [description, setDescription] = useState(false);
  const [host, setHost] = useState(false);
  const [when, setWhen] = useState(false);
  const [where, setWhere] = useState(false);
  const [dress, setDress] = useState(false);
  const [chipin, setChipIn] = useState(false);
  const [eventType, setEventType] = useState(false);

  // Add to List states
  const [addDressCode, setAddDressCode] = useState(false);
  const [addDescription, setAddDescription] = useState(false);
  const [addChipIn, setAddChipIn] = useState(false);
  const [addEventType, setAddEventType] = useState(false);

  // Dropdown visibility states
  const [showDressDropdown, setShowDressDropdown] = useState(false);
  const [showDescriptionDropdown, setShowDescriptionDropdown] = useState(false);
  const [showChipInDropdown, setShowChipInDropdown] = useState(false);
  const [showEventTypeDropdown, setShowEventTypeDropdown] = useState(false);

  // API base URL
  const API_BASE_URL = "https://ujc35n5wgi.execute-api.eu-north-1.amazonaws.com/dev";

  // Set default image on component mount
  useEffect(() => {
    if (!eventImage && imageSources.length > 0) {
      setEventImage({
        type: "template",
        imageSrc: imageSources[0],
        imageUrl: imageSources[0],
      });
    }
  }, [eventImage]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowDressDropdown(false);
      setShowDescriptionDropdown(false);
      setShowChipInDropdown(false);
      setShowEventTypeDropdown(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Modal control functions
  const openPreview = () => setIsPreviewOpen(true);
  const closePreview = () => setIsPreviewOpen(false);

  const openImageModal = () => setImageModal(true);
  const closeImageModal = () => setImageModal(false);

  const openDescription = () => setDescription(true);
  const closeDescription = () => setDescription(false);

  const openWhen = () => setWhen(true);
  const closeWhen = () => setWhen(false);

  const openWhere = () => setWhere(true);
  const closeWhere = () => setWhere(false);

  const openHost = () => setHost(true);
  const closeHost = () => setHost(false);

  const openDress = () => setDress(true);
  const closeDress = () => setDress(false);

  const openChipIn = () => setChipIn(true);
  const closeChipIn = () => setChipIn(false);

  const openEventType = () => setEventType(true);
  const closeEventType = () => setEventType(false);

  // Add List control functions
  const putDress = () => {
    setAddDressCode(true);
  };

  const removeDress = () => {
    setAddDressCode(false);
    setShowDressDropdown(false);
    setEventData((prev) => {
      const newData = { ...prev };
      delete newData.dressCode;
      return newData;
    });
  };

  const putDescription = () => {
    setAddDescription(true);
  };

  const removeDescription = () => {
    setAddDescription(false);
    setShowDescriptionDropdown(false);
    setEventData((prev) => {
      const newData = { ...prev };
      delete newData.description;
      return newData;
    });
  };

  const putChipIn = () => {
    setAddChipIn(true);
  };

  const removeChipIn = () => {
    setAddChipIn(false);
    setShowChipInDropdown(false);
    setEventData((prev) => {
      const newData = { ...prev };
      delete newData.chipIn;
      return newData;
    });
  };

  const putEventType = () => {
    setAddEventType(true);
  };

  const removeEventType = () => {
    setAddEventType(false);
    setShowEventTypeDropdown(false);
  };

  // Dropdown toggle functions
  const toggleDressDropdown = (e) => {
    e.stopPropagation();
    setShowDressDropdown(!showDressDropdown);
    setShowDescriptionDropdown(false);
    setShowChipInDropdown(false);
    setShowEventTypeDropdown(false);
  };

  const toggleDescriptionDropdown = (e) => {
    e.stopPropagation();
    setShowDescriptionDropdown(!showDescriptionDropdown);
    setShowDressDropdown(false);
    setShowChipInDropdown(false);
    setShowEventTypeDropdown(false);
  };

  const toggleChipInDropdown = (e) => {
    e.stopPropagation();
    setShowChipInDropdown(!showChipInDropdown);
    setShowDressDropdown(false);
    setShowDescriptionDropdown(false);
    setShowEventTypeDropdown(false);
  };

  const toggleEventTypeDropdown = (e) => {
    e.stopPropagation();
    setShowEventTypeDropdown(!showEventTypeDropdown);
    setShowChipInDropdown(false);
    setShowDressDropdown(false);
    setShowDescriptionDropdown(false);
  };

  const handleImageSave = (imageData) => {
    setEventImage(imageData);
  };

  const handleHostNameSave = (hostName) => {
    setHostName(hostName);
  };

  const handleDressCodeSave = (dressCode) => {
    setDressCode(dressCode);
  };

  const handleDescriptionSave = (descriptionData) => {
    setDescriptionText(descriptionData.data);
    setDescriptionDisplay(descriptionData.displayText);
  };

  const handleChipInSave = async (chipInData) => {
    setAmount(chipInData.amount);
    setChipInType(chipInData.chipInType);
    setBankCode(chipInData.selectedBankCode);
    setBankName(chipInData.selectedBankName);
    setAccountNumber(chipInData.accountNumber);
  
    // Auto-verify bank details when both account number and bank code are provided
    if (chipInData.accountNumber && chipInData.selectedBankCode) {
      try {
        const verification = await verifyBankAccount(
          chipInData.accountNumber,
          chipInData.selectedBankCode
        );
        if (verification.isValid) {
          setAccountName(verification.accountName);
          // Return the account name to the ChipIn component to update its state
          return verification.accountName;
        } else {
          alert("Bank account verification failed");
        }
      } catch (error) {
        console.error("Bank verification error:", error);
        alert(error.response?.data?.error || "Bank verification failed");
      }
    }
    return null;
  };

  const handleTimeSave = (TimeData) => {
    setStartDate(TimeData.startDate);
    setStartTime(TimeData.startTime);
    setEndDate(TimeData.endDate);
    setEndTime(TimeData.endTime);
  };

  const fullDateTimeRange = startDate
    ? `${startDate}, ${startTime} - ${endDate}, ${endTime}`
    : "when is your event?";

  const handleLocationSave = (LocationData) => {
    setLocation(LocationData.venue);
    setLocationType(LocationData.locationType);
    setState(LocationData.state);
  };

  const handleEventTypeSave = (selectedEventType) => {
    if (selectedEventType) {
      setSelectedTypes(selectedEventType.data);
    }
  };

  const eventTypes = () => {
    return selectedTypes.length > 0 ? (
      <div className="flex flex-wrap gap-2">
        {selectedTypes.map((event, index) => (
          <span
            key={index}
            className={`px-2 py-1 rounded-full border text-[10px] ${event.className}`}>
            {event.title}
          </span>
        ))}
      </div>
    ) : (
      <p>What type of event is this?</p>
    );
  };

  // Get the location display text based on the current state
  const getLocationDisplayText = () => {
    switch (locationType) {
      case "online":
        return `Online - ${location}`;
      case "offline":
        return `${location}, ${state}`;
      default:
        return "Where is your event?";
    }
  };

  // Get the current image URL - fallback to default if eventImage is null
  const getCurrentImageUrl = () => {
    if (eventImage && eventImage.imageUrl) {
      return eventImage.imageUrl;
    }
    return imageSources[0]; // fallback to first image
  };

  // Verify bank account details
  const verifyBankAccount = async (accountNumber, bankCode) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/verify-bank`,
        { accountNumber, bankCode },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Bank verification error:", error);
      throw error;
    }
  };

  // Handle image upload
  const handleImageUpload = async (file) => {
    try {
      const fileName = `event-image-${Date.now()}.${file.name.split(".").pop()}`;
      const response = await axios.post(
        `${API_BASE_URL}/upload`,
        { fileName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { uploadUrl, fileKey } = response.data;

      await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      setEventImage({
        type: "uploaded",
        imageUrl: uploadUrl.split("?")[0], // Remove query params from URL
        imageKey: fileKey,
      });

      return fileKey;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };

  // Create event function
  const handleCreateEvent = async () => {
    setIsLoading(true);
    setError(null);

    // Basic validation
    if (!eventName || !startDate || !location) {
      setError("Please fill all required fields (Event Name, Date, and Location).");
      setIsLoading(false);
      return;
    }

    // Prepare the payload
    const payload = {
      title: eventName,
      description: descriptionText,
      date: startDate,
      timeFrom: startTime,
      timeTo: endTime,
      location: {
        venue: location,
        state: state,
        country: "Nigeria",
      },
      isPrivate: true,
      dressCode: dressCode,
      tempImageKey: eventImage?.imageUrl,
      ...(amount && {
        chipInAmount: amount,
        chipInType: chipInType,
        chipInSettings: {
          fixedAmount: amount,
        },
        bankDetails: {
          bankName: bankName,
          accountNumber: accountNumber,
          accountName: accountName,
          bankCode: bankCode,
        },
      }),
      eventTypes: selectedTypes.map((type) => type.title),
      theme: 1,
      fontStyle: 1,
      isLightMode: true,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/events`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Event created successfully:", response.data);
      alert("Event created successfully!");
      // You might want to redirect to the event page or dashboard here
      // history.push(`/event/${response.data.eventId}`);
    } catch (error) {
      console.error(
        "Error creating event:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data?.error || "Failed to create event. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-[#F0F0F0] min-h-[90vh] h-fit w-full grid gap-[43px] lg:pb-10 pt-10">
      <div className="lg:flex-row flex lg:gap-12 gap-8 flex-col sm:w-fit w-[95%] mx-auto">
        {/* left section */}
        <section className="sm:w-fit w-full h-fit flex flex-col gap-4 mx-auto">
          <div className="grid h-fit w-full">
            <h5 className="text-black text-[14px] font-[700] leading-[20px] satoshi capitalize">
              event image
            </h5>
            <p className="text-[#8A9191] text-[12px] font-[500] leading-[18px] satoshi capitalize">
              Upload a JPEG or PNG file with a size of 2mb or less
            </p>
          </div>
          <div className="relative">
            <img
              src={getCurrentImageUrl()}
              alt="Event-img"
              className="rounded-3xl sm:w-[349px] sm:h-[349px] w-[95vw] h-[306px] backdrop-blur-[12px] object-cover cursor-pointer justify-center"
              onClick={openImageModal}
            />
            <div
              className="hidden absolute cursor-pointer top-[303px] left-[302px] rounded-full xl:flex items-center justify-center h-8 w-8 bg-white shadow-lg hover:bg-gray-100 transition-colors"
              onClick={openImageModal}>
              <img src="/image.svg" className="z-10" alt="" />
            </div>
          </div>
          <div className="flex justify-center p-2 items-start bg-[#F3F0FB]">
            <p className="text-[#7A60BF] text-[12px] font-[500] leading-[18px] satoshi capitalize">
              Images with a 1 : 1 ratio (a square) work best
            </p>
          </div>
          <div className="lg:flex p-3 gap-2 rounded-[12px] bg-white/50 border border-white backdrop-blur-[2px] items-center w-full hidden">
            <h5 className="text-[#8A9191] text-[16px] font-[700] leading-[24px] satoshi capitalize w-full">
              theme settings
            </h5>
            <div className="aspect-square size-[47px] py-3 px-2 flex justify-center items-center rounded-[6px] backdrop-blur-[12px] border border-[#866AD2]"></div>
          </div>
        </section>

        {/* right section */}
        <section className="gap-6 items-start flex flex-col w-full lg:w-[553px] h-fit mx-auto">
          <div className="grid gap-2 w-full">
            <div
              style={{
                boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.08)",
                backdropFilter: "blur(16px)",
              }}
              className="flex p-[4px] rounded-[20px] bg-white lg:w-fit h-fit w-full">
              <div className="items-center py-2 px-[10px] rounded-3xl bg-[#BEFD66] cursor-pointer w-full text-center">
                <h5 className="text-black text-[10px] font-[700] leading-[14px] satoshi capitalize">
                  private
                </h5>
              </div>
              <div
                className="items-center py-2 px-[10px] rounded-3xl bg-white cursor-pointer w-full text-center"
                onClick={onPublic}>
                <h5 className="text-black text-[10px] font-[700] leading-[14px] satoshi capitalize">
                  public
                </h5>
              </div>
            </div>
            <p className="text-[#8A9191] text-[12px] font-[500] leading-[18px] satoshi capitalize w-full text-center lg:text-left">
              Shh... it's exclusive! Only those with the magic link can RSVP.
            </p>
          </div>
          <div className="grid p-3 gap-4 rounded-[12px] bg-white/50 border border-white items-center w-full">
            <input
              type="text"
              placeholder="Event name"
              onChange={(e) => setEventName(e.target.value)}
              value={eventName}
              className="appearance-none bg-transparent border-none text-2xl font-[400] leading-[32px] text-black placeholder-[#8A9191] focus:outline-none paytone"
            />
          </div>
          <Grid title="event details">
            <Input
              leftImgSrc="/timer.svg"
              text={fullDateTimeRange}
              onClick={openWhen}
              className={startDate || endDate ? "text-black" : "text-[#8A9191]"}
            />
            <Input
              leftImgSrc="/location-try.svg"
              text={getLocationDisplayText()}
              onClick={openWhere}
              className={location ? "text-black" : "text-[#8A9191]"}
            />
            <Input
              leftImgSrc="/crown.svg"
              text={hostName || "who is the host?"}
              onClick={openHost}
              className={hostName ? "text-black" : "text-[#8A9191]"}
            />
            {addDressCode && (
              <Input
                leftImgSrc="/dress.svg"
                text={dressCode || "enter dress code"}
                onClick={openDress}
                rightImg="/more-circle.svg"
                onClickRight={toggleDressDropdown}
                showDropdown={showDressDropdown}
                edit={openDress}
                remove={removeDress}
                className={dressCode ? "text-black" : "text-[#8A9191]"}
              />
            )}
            {addDescription && (
              <Input
                leftImgSrc="/note-text.svg"
                text={descriptionDisplay || "event description"}
                onClick={openDescription}
                rightImg="/more-circle.svg"
                onClickRight={toggleDescriptionDropdown}
                showDropdown={showDescriptionDropdown}
                edit={openDescription}
                remove={removeDescription}
                className={descriptionDisplay ? "text-black" : "text-[#8A9191]"}
              />
            )}
            {addChipIn && (
              <Input
                leftImgSrc="/money-add.svg"
                text={amount ? `${chipInType} - ₦${amount}` : "chip-in"}
                onClick={openChipIn}
                rightImg="/more-circle.svg"
                onClickRight={toggleChipInDropdown}
                showDropdown={showChipInDropdown}
                edit={openChipIn}
                remove={removeChipIn}
                className={amount ? "text-black" : "text-[#8A9191]"}
              />
            )}
            {addEventType && (
              <Input
                leftImgSrc="/category-2.svg"
                text={eventTypes()}
                onClick={openEventType}
                rightImg="/more-circle.svg"
                onClickRight={toggleEventTypeDropdown}
                showDropdown={showEventTypeDropdown}
                edit={openEventType}
                remove={removeEventType}
                className="text-[#8A9191]"
              />
            )}

            <div className="flex flex-wrap gap-2 w-full">
              {!addDressCode && (
                <Add title="dress code" onOptionClick={putDress} />
              )}
              {!addDescription && (
                <Add title="description" onOptionClick={putDescription} />
              )}
              {!addChipIn && <Add title="chip-in" onOptionClick={putChipIn} />}
              {!addEventType && (
                <Add title="event type" onOptionClick={putEventType} />
              )}
            </div>
          </Grid>

          {/* Error display */}
          {error && (
            <div className="text-red-500 text-sm p-2 rounded bg-red-50">
              Error: {error}
            </div>
          )}

          {/* Create Event Buttons */}
          <section className="h-fit w-full lg:flex justify-between gap-4 hidden">
            <CreateEventBtn
              text="View Preview"
              bgcolor="bg-[#E6F2F3]"
              textcolor="text-[#095256]"
              onClick={openPreview}
            />
            <CreateEventBtn
              text={isLoading ? "Creating..." : "Create Event"}
              textcolor="text-[#095256]"
              bgcolor="bg-[#aefc40]"
              onClick={handleCreateEvent}
              disabled={isLoading}
            />
          </section>
        </section>
      </div>
      <section className="w-full h-fit px-4 pt-6 pb-12 rounded-t-2xl bg-white/90 lg:hidden grid gap-4">
        <div className="flex p-3 gap-2 rounded-[12px] bg-white/90 border backdrop-blur-[2px] items-center w-full">
          <h5 className="text-[#8A9191] text-[16px] font-[700] leading-[24px] satoshi capitalize w-full">
            theme settings
          </h5>
          <div className="aspect-square size-[47px] py-3 px-2 flex justify-center items-center rounded-[6px] backdrop-blur-[12px] border border-[#866AD2]"></div>
        </div>
        <section className="h-fit w-full flex justify-between gap-4">
          <CreateEventBtn
            text="View Preview"
            bgcolor="bg-[#E6F2F3]"
            textcolor="text-[#095256]"
            onClick={openPreview}
          />
          <CreateEventBtn
            text={isLoading ? "Creating..." : "Create Event"}
            textcolor="text-[#095256]"
            bgcolor="bg-[#aefc40]"
            onClick={handleCreateEvent}
            disabled={isLoading}
          />
        </section>
      </section>

      {/* All Modals */}
      <When isVisible={when} onClose={closeWhen} onSave={handleTimeSave} />
      <Where
        isVisible={where}
        onClose={closeWhere}
        onSave={handleLocationSave}
      />
      <Host isVisible={host} onClose={closeHost} onSave={handleHostNameSave} />
      <ImageModal
        onClose={closeImageModal}
        isOpen={imageModal}
        onSave={handleImageSave}
        onUpload={handleImageUpload}
        banks={banks}
      />
      <Description
        isVisible={description}
        onClose={closeDescription}
        onSave={handleDescriptionSave}
      />
      <DressCode
        isVisible={dress}
        onClose={closeDress}
        onSave={handleDressCodeSave}
      />
<ChipIn
  isVisible={chipin}
  onClose={closeChipIn}
  onSave={async (chipInData) => {
    const accountName = await handleChipInSave(chipInData);
    if (accountName) {
      return { ...chipInData, accountName };
    }
    return chipInData;
  }}
  banks={banks}
/>
      <EventType
        isVisible={eventType}
        onClose={closeEventType}
        onSave={handleEventTypeSave}
      />
      {isPreviewOpen && (
        <Preview
          closeModal={closePreview}
          eventImg={getCurrentImageUrl()}
          eventName={eventName}
          hostName={hostName}
          description={descriptionText}
          dressCode={dressCode}
          state={state}
          location={location}
          locationType={locationType}
          amount={amount}
        />
      )}
    </main>
  );
};

export default Private;