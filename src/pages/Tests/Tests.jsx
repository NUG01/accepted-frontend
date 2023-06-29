import {
  CheckCircleIcon,
  ChevronRightIcon,
  EnvelopeIcon,
} from "@heroicons/react/20/solid";
import checkAuth from "../../guards/checkAuth";
import BasicAxios from "../../helpers/axios";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import UncheckedCircle from "../../assets/icons/UncheckedCircle";
import CheckedCircle from "../../assets/icons/CheckedCircle";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Tests() {
  const location = useLocation();
  const [dataIsFetched, setDataIsFetched] = useState(false);
  const [tests, setTests] = useState(false);
  const [userTests, setUserTests] = useState([]);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    async function fetch() {
      const res = await BasicAxios.get("test-types");
      const response = await BasicAxios.get("user-tests/" + user.id);
      setUserTests(response.data);
      setTests(res.data.data);
      setDataIsFetched(true);
    }
    fetch();
  }, []);

  if (!dataIsFetched) return;

  return (
    <div className="min-h-[100vh] bg-[var(--light-soft-gray)]">
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
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <p className="truncate text-md font-medium text-indigo-600">
                            {test.name == "general" && "ზოგადი უნარები"}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            {userTests.find(
                              (x) => x.test_type_id == test.id
                            ) ? (
                              <CheckedCircle
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                                aria-hidden="true"
                              />
                            ) : (
                              <UncheckedCircle
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                                aria-hidden="true"
                              />
                            )}

                            {userTests.find((x) => x.test_type_id == test.id)
                              ? "დაზუთხული"
                              : "დასაზუთხი"}
                            {test.stage}
                          </p>
                        </div>
                        <div className="hidden md:block">
                          <div>
                            <p className="text-sm text-gray-900">
                              ვარიანტი:&nbsp;{test.version}
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <span className="truncate">წელი:&nbsp;</span>
                              <span className="truncate"> {test.year}</span>
                            </p>
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

export default Tests;
