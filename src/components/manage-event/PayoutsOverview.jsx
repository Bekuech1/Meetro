import Tooltip from "../layout-components/Tooltip";
import ToggleBalance from "./ToggleBalance";
import TextButton from "../layout-components/Buttons/TextButtons";
import { InfoCircle } from "iconsax-reactjs";
import { useNavigate, useParams } from "react-router";

function PayoutsOverview({ availablePayout = 0, totalReceived = 0 }) {
  const navigate = useNavigate();
  const { slug: eventId } = useParams();

  const handleWithdrawClick = () => {
    navigate(`/manage-event/${eventId}/withdraw`);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      <div className="flex sm:flex-[1.2] flex-col">
        <h3 className="satoshi font-bold text-[#8A96A3] text-xs sm:text-sm">
          Total Amount Received
        </h3>
        <ToggleBalance balance={totalReceived} />
      </div>
      <div className="flex sm:flex-1 flex-col">
        <div className="flex items-center gap-1">
          <Tooltip
            content="Your funds are safe. Payments are released 2 days after they’re received due to standard settlement by our payment partner."
            placement="left"
            defaultPlacement="right"
          >
            <InfoCircle variant="Bold" className="text-[#8A9191]" size={16} />
          </Tooltip>
          <h3 className="satoshi font-bold text-[#8A96A3] text-xs sm:text-sm">
            Available Payout
          </h3>
        </div>
        <ToggleBalance balance={availablePayout} />
      </div>
      <TextButton
        text="Withdraw"
        variant="primary"
        className="w-full sm:w-auto"
        onClick={handleWithdrawClick}
      />
    </div>
  );
}

export default PayoutsOverview;
