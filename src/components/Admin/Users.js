import React, { useEffect, useState } from "react";
import _ from "lodash";
import BigScreenHeader from "./BigScreenHeader";
import Spinner from "../Spinner";
import getClients from "./BoxData";
import Page404 from "./Page404";

function Users({ clients, handleDelete }) {
  const [cardData, setCardData] = useState([0, 0]);
  useEffect(() => {
    setCardData(getClients(clients));
  }, [clients]);

  const [adminInfo, setAdminInfo] = useState({
    admin_name: "",
    admin_image: "",
    email: "",
  });

  useEffect(() => {
    fetch("/admin/me")
      .then((resp) => resp.json())
      .then((data) =>
        setAdminInfo({
          ...adminInfo,
          admin_name: data.admin_name,
          admin_image: data.admin_image,
          email: data.email,
        })
      );
  }, []);

  return (
    <>
      {_.isEqual(
        {
          admin_name: "",
          admin_image: "",
          email: "",
        },
        adminInfo
      ) ? (
        <Page404 />
      ) : (
        <div className="main">
          <BigScreenHeader />
          <div className="top-cards-container mt-4 grid lgPro:grid-cols-3 mdPro:grid-cols-2 md:grid-cols-2 justify-items-center grid-cols-1 gap-8 p-4">
            {" "}
            <div className="top-card">
              <span>Users with Tickets</span>
              <span className="flex justify-between items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
                <span>{cardData[0]}</span>
              </span>
            </div>
            <div className="top-card">
              <span>Users without Tickets</span>
              <span className="flex justify-between items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <span>{cardData[1]}</span>
              </span>
            </div>
          </div>
          <div className="text-center text-xl tracking-wider font-bold p-2 my-4">
            User Management
          </div>
          {clients.length > 0 ? (
            <div className="relative shadow-md sm:rounded-lg flex justify-center">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-center">
                      Client
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Permissions
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Tickets
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Comments
                    </th>
                    <th scope="col" className="px-6 py-3 text-center sr-only">
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => {
                    return (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={client.id}>
                        <th
                          scope="row"
                          className="px-8 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex gap-4 justify-center items-center"
                        >
                          <img
                            src={client.client_image}
                            alt={client.client_name} 
                            className="w-12 h-12 rounded-full outline outline-green-500 object-cover"
                          />
                          <div className="md:flex flex-col hidden flex-1">
                            <span>{client.client_name}</span>
                            <span className="text-sm italic">
                              {client.email}
                            </span>
                          </div>
                        </th>
                        <td className="px-6 py-4 text-center">Low Level</td>
                        <td className="px-6 py-4 text-center">
                          {client.tickets.length}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {client.comments.length}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            className="font-medium text-white bg-red-500 px-2 py-1 rounded-lg hover:scale-[1.03] transition duration-1000 ease-in-out"
                            onClick={() => handleDelete(client.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <Spinner />
            </div>
          )}
          {/* {clients.length > 0 ? (
            <section className="user-cards grid lgPro:grid-cols-2 justify-items-center gap-8">
              {clients.map((client) => (
                <UserCard
                  key={client.id}
                  client={client}
                  handleDelete={handleDelete}
                />
              ))}
            </section>
          ) : (
            <div className="w-full flex justify-center">
              <Spinner />
            </div>
          )} */}
        </div>
      )}
    </>
  );
}

export default Users;
