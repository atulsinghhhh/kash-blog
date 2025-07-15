import React from "react"

const Slidebar = () => {
    // Static data
    const tags = ["javascript", "react", "poetry", "lifestyle", "nodejs"];
    const authors = [
        { username: "kash" },
        { username: "atul" },
        { username: "guestuser" },
        { username: "john_doe" },
        { username: "coder123" }
    ];

    return (
        <aside className="bg-gray-100 rounded-xl p-4 space-y-6">
            <div>
                <h3 className="text-gray-700 font-semibold mb-2">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="text-gray-700 font-semibold mb-2">Top Authors</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                    {authors.map(author => (
                        <li key={author.username} className="flex items-center gap-2">
                            @{author.username}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default Slidebar;
