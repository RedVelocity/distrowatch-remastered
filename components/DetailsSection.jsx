const DetailsSection = ({ details }) => (
  <section>
    <div className="w-full bg-white border-t p-4">
      <table className="items-center">
        <tbody className="divide-y px-4">
          {details.map(
            (detail) =>
              detail[1].length > 0 && (
                <tr className="flex flex-col md:grid grid-cols-4">
                  <td className="px-6 p-2 font-medium">{detail[0]}</td>
                  <td className="px-6 p-2 col-span-3">
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
