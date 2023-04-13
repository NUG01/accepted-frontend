import {
  CheckCircleIcon,
  ChevronRightIcon,
  EnvelopeIcon,
} from "@heroicons/react/20/solid";
import checkAuth from "../../guards/checkAuth";
import BasicAxios from "../../helpers/axios";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { Link, useLocation } from "react-router-dom";
// const tests = [
//   {
//     applicant: {
//       name: "Ricardo Cooper",
//       email: "ricardo.cooper@example.com",
//       imageUrl:
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//     date: "2020-01-07",
//     dateFull: "January 7, 2020",
//     stage: "Completed phone screening",
//     href: "#",
//   },
// ];

function Tests() {
  const location = useLocation();
  const [dataIsFetched, setDataIsFetched] = useState(false);
  const [tests, setTests] = useState(false);
  useEffect(() => {
    async function fetch() {
      const res = await BasicAxios.get("test-types");
      const resp = await BasicAxios.get("tests/1");
      setTests(res.data.data);
      console.log(res.data.data);
      setDataIsFetched(true);
      // console.log(resp);
    }
    fetch();
  }, []);

  return (
    <div>
      {!dataIsFetched && <Spinner />}
      {dataIsFetched && (
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {tests.map((test) => (
              <li key={test.id}>
                <Link
                  to={location.pathname + "/" + test.id}
                  className="block hover:bg-gray-50"
                >
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="flex min-w-0 flex-1 items-center">
                      {/* <div className="flex-shrink-0">
                        <img
                          className="h-12 w-12 rounded-full"
                          src={test.applicant.imageUrl}
                          alt=""
                        />
                      </div> */}
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <p className="truncate text-md font-medium text-indigo-600">
                            {test.name == "general" && "ზოგადი უნარები"}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            <CheckCircleIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                              aria-hidden="true"
                            />
                            დაზუთხული
                            {test.stage}
                          </p>
                          {/* <p className="mt-2 flex items-center text-sm text-gray-500">
                          
                            <span className="truncate">წელი:&nbsp;</span>
                            <span className="truncate"> {test.year}</span>
                          </p> */}
                        </div>
                        <div className="hidden md:block">
                          <div>
                            <p className="text-sm text-gray-900">
                              ვარიანტი:&nbsp;{test.version}
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              {/* <EnvelopeIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            /> */}
                              <span className="truncate">წელი:&nbsp;</span>
                              <span className="truncate"> {test.year}</span>
                            </p>
                            {/* <p className="mt-2 flex items-center text-sm text-gray-500">
                              <CheckCircleIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                                aria-hidden="true"
                              />
                              {test.stage}
                            </p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default checkAuth(Tests);
