const DetailsSection = ({ details }) => (
  <section>
    <div className="w-full bg-white border-t holder">
      <table className="table-fixed">
        <tbody className="divide-y">
          {details.map(
            (detail) =>
              detail[1].length > 0 && (
                <tr className="py-1">
                  <td className="p-2 font-medium md:w-1/4">{detail[0]}</td>
                  <td className="p-2 col-span-3">
                    {detail[1].map((links) => (
                      <a
                        className="text-blue-700"
                        href={links.link}
                        target="_blank"
                        rel="noreferrer"
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
