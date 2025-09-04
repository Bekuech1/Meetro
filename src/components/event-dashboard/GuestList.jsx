import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function GuestList({ guests }) {
  // console.log("guests:", guests);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* two btns at the top */}

      {/* notice to event creators */}
      {/* <div className="bg-[#F3F0FB] border border-[#D9D1F1] rounded-2xl p-2 flex flex-col gap-2 text-[#7A60BF] items-center justify-center">
        <p className="font-bold text-[16px]">✏️ Heads up, Creator!</p>
        <p className="font-medium text-sm text-center">
          You can only withdraw after the event to ensure refunding is possible
          if the event is canceled
        </p>
      </div> */}

      {/* guest list display  */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-sm text-[#001010] font-bold satoshi">
            Guest List
          </h2>
          <p className="text-[12px] font-medium text-[#8A9191] satoshi">
            Your Event, Your Guests, Stay in the Know!
          </p>
        </div>

        {guests && guests.length === 0 ? (
          // if the guest count is still zero
          <div className="flex flex-col gap-2 items-center justify-center w-[420px] mx-auto">
            <p className="text-[#001010] text-lg font-bold satoshi">
              No guests yet, let's change that!
            </p>
            <p className="text-[#8A9191] text-[16px] font-medium text-center satoshi">
              Invite your friends or share the event link to start filling up
              this list.
            </p>
          </div>
        ) : (
          // table to render guestlist
          <Table className="bg-[#FFFFFE80] rounded-t-2xl border border-[#FFFFFF] overflow-clip satoshi">
            <TableHeader>
              <TableRow className={"border-b border-[#FFFFFF] rounded-t-2xl"}>
                <TableHead className={"text-[#8A9191] text-[12px] font-medium"}>
                  Guest
                </TableHead>
                <TableHead className={"text-[#8A9191] text-[12px] font-medium"}>
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {guests.map((guest, idx) => (
                <TableRow key={idx} className="">
                  <TableCell className="">
                    <p className="text-[#001010] font-medium text-sm">
                      {guest?.M?.name?.S}
                    </p>
                    <p className="text-[#8A9191] font-medium text-[12px]">
                      {guest?.M?.email?.S}
                    </p>
                  </TableCell>

                  <TableCell>
                    {guest?.M?.responseType?.S === "yes" ? (
                      <p className="py-1 px-2 bg-[#61B42D] text-[12px] font-bold satoshi text-white rounded-3xl inline">
                        Going
                      </p>
                    ) : (
                      <p className="py-1 px-2 bg-[#D9D1F1] text-[12px] font-bold satoshi text-[#382D58] rounded-3xl inline">
                        Maybe
                      </p>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
