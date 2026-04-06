import TextButton from "../layout-components/Buttons/TextButtons";

function Preferences() {
  return (
    <div className="satoshi">
      <div className="mb-6">
        <h1 className="paytone text-2xl leading-8 font-normal">Preferences</h1>
        <p className="text-[#8A9191] text-xs font-medium">
          Your preferences will appear here
        </p>
      </div>

      {/* Save Button */}
      <TextButton text="Save Changes" variant="primary" className="min-w-0" />
    </div>
  );
}

export default Preferences;
