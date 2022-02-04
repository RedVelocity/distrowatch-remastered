const DetailsSection = ({ details }) => (
  <section>
    <div className="w-full bg-white border-t holder">
      <table className="table-fixed">
        <tbody className="divide-y">
          {details.map(
            (detail, index) =>
              detail[1].length > 0 && (
                <tr className="py-1" key={index}>
                  <td className="block p-2 font-medium md:table-cell md:w-1/4">
                    {`${detail[0]} `}
                    <i className="w-3 h-3 text-gray-400 align-middle fas fa-external-link-alt" />
                  </td>
                  <td className="block p-2 md:table-cell">
                    {detail[1].map((links, i) => (
                      <a
                        href={links.link}
                        target="_blank"
                        rel="noreferrer"
                        key={i}
                      >
                        <span className="text-gray-500">{` • `}</span>
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
