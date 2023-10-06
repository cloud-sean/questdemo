import { Button } from "@/components/ui/button";
import { FC, useState } from "react";
import { useChatContext } from "../chat-context";

const options = [
    { value: "HRDOCS", label: "HR Documents" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
];

export const ChatIndexUI: FC = () => {
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
