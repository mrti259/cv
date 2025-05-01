type ResumeData = {
    info: {
        name: string;
        position: string;
        location: string;
        email: string;
        linkedin: string;
        photo?: string;
    };
    sections: Array<{
        title: string;
        content: string[];
    }>;
};

type ResumeStyle = {
    columns: number;
    textColor: string;
    linkColor: string;
    primaryColor: string;
    font: {
        family: string;
        size: string;
    };
    photo: {
        size: string;
        radius: string;
    };
    section: {
        shadow: string;
        radius: string;
    };
};