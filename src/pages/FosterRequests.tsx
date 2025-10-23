import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./FosterRequests.css";

interface Pet {
    _id: string;
    name: string;
    breed?: string;
    location?: string;
    images?: { url: string }[];
    owner?: { name: string };
}

interface FosterRequest {
    _id: string;
    status: "pending" | "in_discussion" | "approved" | "rejected";
    submittedAt: string;
    message?: string;
    chatThread?: string;
    user?: { _id: string };
}

interface FosterRequestItem {
    pet: Pet;
    fosterRequest: FosterRequest;
}

const statusClasses: Record<string, string> = {
    pending: "status-pending",
    in_discussion: "status-in-discussion",
    approved: "status-approved",
    rejected: "status-rejected",
};

const statusDisplay: Record<string, string> = {
    pending: "Pending",
    in_discussion: "In Discussion",
    approved: "Approved",
    rejected: "Rejected",
};

// Dummy data
const dummyRequests: FosterRequestItem[] = [
    {
        pet: {
            _id: "p1",
            name: "Buddy",
            breed: "Golden Retriever",
            location: "Toronto, ON",
            images: [{ url: "https://placedog.net/300/300?id=1" }],
            owner: { name: "Alice" },
        },
        fosterRequest: {
            _id: "f1",
            status: "pending",
            submittedAt: "2025-10-22T12:00:00Z",
            message: "I would love to foster Buddy!",
            chatThread: "chat12345678",
            user: { _id: "u1" },
        },
    },
    {
        pet: {
            _id: "p2",
            name: "Mittens",
            breed: "Tabby Cat",
            location: "Mississauga, ON",
            images: [{ url: "https://placedog.net/300/300?id=2" }],
            owner: { name: "Bob" },
        },
        fosterRequest: {
            _id: "f2",
            status: "in_discussion",
            submittedAt: "2025-10-20T15:30:00Z",
            message: "I have experience with cats.",
            chatThread: "chat87654321",
            user: { _id: "u2" },
        },
    },
    {
        pet: {
            _id: "p3",
            name: "Charlie",
            breed: "Beagle",
            location: "Brampton, ON",
            images: [{ url: "https://placedog.net/300/300?id=3" }],
            owner: { name: "Carol" },
        },
        fosterRequest: {
            _id: "f3",
            status: "approved",
            submittedAt: "2025-10-18T09:00:00Z",
            message: "Excited to help!",
            chatThread: "chat11223344",
            user: { _id: "u3" },
        },
    },
];

const FosterCard = ({ item }: { item: FosterRequestItem }) => {
    const { pet, fosterRequest } = item;

    const openChat = (chatThreadId: string) => {
        window.location.href = `/chat-interface?thread=${chatThreadId}&type=foster`;
    };

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString();

    return (
        <div className="foster-card">
            <div className="foster-card-header">
                <div className="pet-info">
                    <img
                        src={pet.images?.[0]?.url || "/images/placeholder.png"}
                        alt={pet.name}
                        className="pet-img"
                        loading="lazy"
                    />
                    <div>
                        <h3>{pet.name || "Unknown Pet"}</h3>
                        <p>
                            {pet.breed || "Mixed Breed"} • {pet.location || "Unknown location"}
                        </p>
                        <p>Listed by: {pet.owner?.name || "Unknown Owner"}</p>
                        <p>Submitted: {formatDate(fosterRequest.submittedAt)}</p>
                    </div>
                </div>
                <span className={`status-badge ${statusClasses[fosterRequest.status]}`}>
                    {statusDisplay[fosterRequest.status]}
                </span>
            </div>

            {fosterRequest.message && (
                <div className="foster-message">
                    <strong>Your message:</strong> {fosterRequest.message}
                </div>
            )}

            <div className="foster-card-footer">
                {fosterRequest.status === "in_discussion" && fosterRequest.chatThread ? (
                    <button
                        className="btn btn-primary"
                        onClick={() => openChat(fosterRequest.chatThread!)}
                    >
                        Open Chat
                    </button>
                ) : (
                    <span className="status-text">
                        {fosterRequest.status === "pending"
                            ? "Waiting for owner response..."
                            : fosterRequest.status === "approved"
                                ? "Foster approved! 🎉"
                                : "Foster request declined"}
                    </span>
                )}
                {fosterRequest.chatThread && (
                    <span className="chat-id">
                        Chat ID: {fosterRequest.chatThread.substring(0, 8)}...
                    </span>
                )}
            </div>
        </div>
    );
};

export default function FosterRequests() {
    const [requests] = useState<FosterRequestItem[]>(dummyRequests);

    return (
        <div className="foster-page bg-gradient">
            <Header />
            <main className="foster-main">
                <h1 className="page-title">My Foster Requests</h1>
                <p className="page-subtitle">Manage your pet foster applications</p>

                {requests.length === 0 ? (
                    <div className="no-requests-card">
                        <h3>No foster requests yet</h3>
                        <p>Start by browsing pets and submitting foster requests.</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => (window.location.href = "/pet-browser")}
                        >
                            Browse Pets
                        </button>
                    </div>
                ) : (
                    <div className="foster-list">
                        {requests.map((item) => (
                            <FosterCard key={item.fosterRequest._id} item={item} />
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
