const DetailsSection = ({ details }) => (
  <div className="holder max-w-full overflow-x-auto border-t bg-white">
    <table className="w-full">
      <tbody className="divide-y">
        {details.map(
          (detail, index) =>
            detail[1].length > 0 && (
              <tr key={index}>
                <td className="block pt-2 pb-1 font-medium md:table-cell md:w-1/4 md:p-2">
                  <span>
                    {`${detail[0]} `}
                    <i className="fas fa-external-link-alt h-3 w-3 text-gray-400" />
                  </span>
                </td>
                <td className="block pb-2 md:table-cell md:p-2">
                  {detail[1].map((links, i) => (
                    <a
                      href={links.link}
                      target="_blank"
                      rel="noreferrer"
                      key={i}
                    >
                      {i > 0 && <span className="text-gray-500">{` • `}</span>}
                      {links.text}
                    </a>
                  ))}
                </td>
              </tr>
            )
        )}
      </tbody>
    </table>
  </div>
);

export default DetailsSection;
