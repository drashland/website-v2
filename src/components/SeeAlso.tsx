export function SeeAlso(props) {
  return (
    <div className="nx-mt-6">
      <p className="nx-mt-6 nx-leading-7 first:nx-mt-0 text-sm">
        <span>Related terms:</span>
        {/* <ul className="nx-mt-6 nx-list-disc first:nx-mt-0 ltr:nx-ml-6 rtl:nx-mr-6"> */}
        {Object.keys(props.items).sort().map((key, index) => {
          return (
            // <li
            //   className="nx-my-2"
            //   key={`see_also_${key}_${index}`}
            // >
            <>
              <a
                href={`#${key}`}
                className="nx-text-primary-600 nx-underline nx-decoration-from-font [text-underline-position:from-font]"
                rel="noreferrer"
              >
                {props.items[key]}
              </a>
              {index + 1 === Object.keys(props.items).length ? "" : ", "}
            </>
            // </li>
          );
        })}
        {/* </ul> */}
      </p>
    </div>
  );
}
