export default function Toggle(props) {
  return (
    <label className="cursor-pointer">
      {/* Hidden native checkbox input */}
      <input type="checkbox" {...props} className="sr-only peer" />
      {/* Custom Toggle input*/}
      <div className="flex relative w-12 h-8 md:w-11 md:h-6 bg-[#E5E7E3] border border-white transition-all rounded-[50px] peer-checked:after:translate-x-4 rtl:peer-checked:after:translate-x-4 md:rtl:peer-checked:after:translate-x-5 md:peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-[4px] after:bg-white after:rounded-full after:w-6 md:after:h-4 md:after:w-4 after:h-6 after:transition-all peer-checked:bg-[#61B42D] peer-checked:after:bg-[#AEFC40]" />
    </label>
  );
}
