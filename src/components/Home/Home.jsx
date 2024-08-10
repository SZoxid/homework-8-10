import React, { useState, useEffect } from "react";
import { Table, Pagination } from "flowbite-react";
import { Link } from "react-router-dom";

function Home({ selectedCountries, setSelectedCountries }) {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  const handleSelect = (country) => {
    const alreadySelected = selectedCountries.some(
      (c) => c.name.common === country.name.common
    );

    if (alreadySelected) {
      setSelectedCountries(
        selectedCountries.filter((c) => c.name.common !== country.name.common)
      );
    } else {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  return (
    <div>
      <section className="text-center my-8">
        <h1 className="text-2xl font-bold">Davlatlar ro'yxati</h1>
      </section>

      <div className="my-8">
        {}
        <div className="overflow-x-auto mb-8">{}</div>

        {}
        <Table hoverable>
          <Table.Head className="bg-[#0891b2] text-white">
            <Table.HeadCell>Nomi</Table.HeadCell>
            <Table.HeadCell>Axolisi</Table.HeadCell>
            <Table.HeadCell>Poytaxti</Table.HeadCell>
            <Table.HeadCell>Bayrogi</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {countries
              .slice((currentPage - 1) * 10, currentPage * 10)
              .map((country) => (
                <Table.Row key={country.cca3}>
                  <Table.Cell>
                    <Link
                      to={`/country/${country.name.common}`}
                      className="text-blue-600 hover:underline"
                    >
                      {country.name.common}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{country.population.toLocaleString()}</Table.Cell>
                  <Table.Cell>
                    {country.capital ? country.capital[0] : "Noma’lum"}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={country.flags.png}
                      alt={`${country.name.common} bayrog'i`}
                      className="h-6"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      color={
                        selectedCountries.some(
                          (c) => c.name.common === country.name.common
                        )
                          ? "success"
                          : "light"
                      }
                      onClick={() => handleSelect(country)}
                    >
                      Tanlash
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>

        {}
        <div className="flex justify-center mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.max(1, Math.ceil(countries.length / 10))}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
