import { Button } from "@/components/ui/button";
import { FC, useState, useEffect } from "react";
import { useChatContext } from "../chat-context";

// make an api call to api/indexes with a Request object




export const ChatIndexUI: FC = () => {
    const url = "/api/indexes";
    const request = new Request(url, {
    method: "GET",
    });
    const [indexes, setIndexes] = useState<string[]>([]);
    useEffect(() => {
        fetch(request)
        .then((response) => {
            if (!response.ok) {
            throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setIndexes(data);
        })
        .catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
        });
    }, []);



    const options = indexes.map((index) => ({ value: index, label: index }));
 
    const { id } = useChatContext();

    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div className="flex flex-col gap-2">
            <form className="flex gap-2">
                <select
                    value={selectedOption}
                    onChange={handleOptionChange}
                    className="border border-gray-300 rounded-md p-2 w-3/4"
                >
                    <option value="">Select an option</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <Button
                    type="submit"
                    value="Submit"
                    disabled={!selectedOption}
                    className="flex items-center gap-1 w-1/4"
                >
                    Submit
                </Button>
            </form>
        </div>
    );
};
