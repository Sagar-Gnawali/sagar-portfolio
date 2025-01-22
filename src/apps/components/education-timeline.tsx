export function EducationTimeLine() {
  return (
    <>
      <p className="text-2xl leading-1 mb-3 capitalize ml-1">education</p>
      <div className="flex gap-x-3 relative group rounded-lg hover:bg-gray-100 dark:hover:bg-grey/10">
        <a className="z-[1] absolute inset-0" href="#"></a>
        <div className="relative last:after:hidden after:absolute after:top-0 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700 dark:group-hover:after:bg-neutral-600">
          <div className="relative z-10 size-7 flex justify-center items-center">
            <div className="size-2 rounded-full bg-white border-2 border-gray-300 group-hover:border-gray-600 dark:bg-neutral-800 dark:border-neutral-600 dark:group-hover:border-neutral-600"></div>
          </div>
        </div>
        <div className="grow p-2 pb-8">
          <h3 className=" gap-x-1.5 font-medium text-gray-800 dark:text-black">
            <div className="flex justify-between mb-1">
              <span> IK Gujral Punjab Technical University </span>
              <span> 2017 - 2021 </span>
            </div>
            <p className="text-xs font-medium capitalize text-gray-500 dark:text-neutral-00 flex justify-between">
              <span> (Punjab Technical University affiliated)</span>
            </p>
          </h3>
          <button
            type="button"
            className=" -ms-1 p-1 relative z-10 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 "
          >
            <ul className="list-none">
              <li className="text-start">
                B.Tech (Bachelors in Computer Science Engineering )
              </li>
              <li className="text-start">Kapurthala, Punjab, India</li>
            </ul>
          </button>
        </div>
      </div>
    </>
  );
}
