const DetailsSection = ({ details }) => (
  <section>
    <div className="bg-white border-t holder">
      <table className="w-full table-fixed">
        <tbody className="divide-y">
          {details.map(
            (detail, index) =>
              detail[1].length > 0 && (
                <tr className="py-1" key={index}>
                  <td className="block pt-2 pb-1 font-medium md:p-2 md:table-cell md:w-1/4">
                    {`${detail[0]} `}
                    <i className="w-3 h-3 text-gray-400 align-middle fas fa-external-link-alt" />
                  </td>
                  <td className="block pb-2 md:p-2 md:table-cell">
                    {detail[1].map((links, i) => (
                      <a
                        href={links.link}
                        target="_blank"
                        rel="noreferrer"
                        key={i}
                      >
                        {i > 0 && (
                          <span className="text-gray-500">{` • `}</span>
                        )}
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
  </section>
);

export default DetailsSection;
