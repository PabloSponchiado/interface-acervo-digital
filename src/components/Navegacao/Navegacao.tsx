import { useState, type JSX } from "react";
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import { Avatar } from 'primereact/avatar';
import { Sidebar } from 'primereact/sidebar';
import { useNavigate } from 'react-router-dom';
import AuthRequests from "../../fetch/AuthRequests";
import appIcon from "../../assets/app-icon.png";

interface CustomMenuItem extends MenuItem {
    badge?: number;
    shortcut?: string;
    items?: CustomMenuItem[];
}

function Navegacao(): JSX.Element {
    const [isAuthenticated] = useState(() => {
        const isAuth = localStorage.getItem('isAuth');
        const token = localStorage.getItem('token');
        return !!(isAuth && token && AuthRequests.checkTokenExpiry());
    });
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const navigate = useNavigate();

    const nome = localStorage.getItem('nome') || 'Usuário';
    const email = localStorage.getItem('email') || '';
    const avatarImage = "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png";

    const items: CustomMenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            className: 'mx-4 md:mx-4 text-white text-sm md:text-base lg:text-lg',
            url: "/"
        },
        ...(isAuthenticated ? [
            {
                label: 'Alunos',
                icon: 'pi pi-star',
                className: 'mx-4 md:mx-4 text-white text-sm md:text-base lg:text-lg',
                url: "/lista/alunos"
            },
            {
                label: 'Livros',
                icon: 'pi pi-star',
                className: 'mx-4 md:mx-4 text-white text-sm md:text-base lg:text-lg',
                url: "/lista/livros"
            },
            {
                label: 'Empréstimos',
                icon: 'pi pi-star',
                className: 'mx-4 md:mx-4 text-white text-sm md:text-base lg:text-lg',
                url: "/lista/emprestimos"
            }
        ] : [])
    ];

    const start = (
        <button
            onClick={() => setSidebarVisible(true)}
            className="cursor-pointer bg-transparent border-none p-0"
        >
            <img
                alt="logo"
                src={appIcon}
                className="h-10 md:h-12 lg:h-14 w-auto"
            />
        </button>
    );

    const userActions = isAuthenticated ? (
        <div className="flex items-center justify-end mr-4 md:mr-6 lg:mr-10 gap-2 md:gap-4">
            <div className="flex flex-col pr-2 md:pr-3 hidden sm:flex">
                <p className="text-white font-semibold m-0 text-sm md:text-base">{nome}</p>
                <p className="text-white text-xs md:text-sm m-0">{email}</p>
            </div>
            <Avatar
                image={avatarImage}
                shape="circle"
                className="!w-8 !h-8 md:!w-10 md:!h-10"
            />
            <button
                className="bg-white ml-2 md:ml-4 text-slate-700 px-3 py-1.5 md:px-5 md:py-2 rounded border-none cursor-pointer flex items-center justify-center gap-1 hover:bg-gray-100 transition-colors text-xs md:text-sm"
                onClick={AuthRequests.removeToken}
            >
                <i className="pi pi-sign-out"></i>
                <span>Sair</span>
            </button>
        </div>
    ) : (
        <button
            className="bg-white font-bold text-slate-700 px-3 py-1.5 md:px-5 md:py-2 mr-4 md:mr-6 lg:mr-10 rounded border-none cursor-pointer flex items-center justify-center gap-1 hover:bg-gray-100 transition-colors text-xs md:text-sm"
            onClick={() => navigate('/login')}
        >
            <i className="pi pi-sign-in"></i>
            <span>Login</span>
        </button>
    );

    return (
        <header className="card bg-slate-700 flex items-center px-2 md:px-4 py-3 min-h-[64px]">
            {start}
            {/* Desktop/Tablet Menu */}
            <div className="hidden sm:flex flex-1 ml-4">
                <Menubar
                    model={items}
                    className="border-none bg-transparent"
                />
            </div>
            {/* Desktop/Tablet User Actions */}
            <div className="hidden sm:block">
                {userActions}
            </div>
            {/* Mobile Sidebar */}
            <Sidebar
                visible={sidebarVisible}
                onHide={() => setSidebarVisible(false)}
                modal={true}
                position="left"
                dismissable={true}
                closeOnEscape={true}
                className="w-full md:w-80 bg-slate-800"
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center mb-4">
                        <img
                            alt="logo"
                            src={appIcon}
                            className="h-10 w-auto mr-4"
                        />
                        <h2 className="text-white font-bold">Menu</h2>
                    </div>
                    <nav className="flex-1">
                        <ul className="space-y-2">
                            {items.map((item, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => {
                                            if (item.url) navigate(item.url);
                                            setSidebarVisible(false);
                                        }}
                                        className="w-full text-left px-4 py-3 rounded-md hover:bg-slate-700 transition-colors flex items-center gap-3 text-white"
                                    >
                                        <i className={`${item.icon} text-lg`}></i>
                                        <span>{item.label}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    {/* Mobile User Info and Actions */}
                    <div className="border-t pt-4">
                        {isAuthenticated ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Avatar
                                        image={avatarImage}
                                        shape="circle"
                                        className="!w-10 !h-10"
                                    />
                                    <div>
                                        <p className="text-white font-semibold m-0">{nome}</p>
                                        <p className="text-slate-400 text-sm m-0">{email}</p>
                                    </div>
                                </div>
                                <button
                                    className="w-full bg-slate-700 text-white px-4 py-2 rounded border-none cursor-pointer flex items-center justify-center gap-2 hover:bg-slate-600 transition-colors"
                                    onClick={() => {
                                        AuthRequests.removeToken();
                                        setSidebarVisible(false);
                                    }}
                                >
                                    <i className="pi pi-sign-out"></i>
                                    <span>Sair</span>
                                </button>
                            </div>
                        ) : (
                            <button
                                className="w-full bg-slate-700 text-white px-4 py-2 rounded border-none cursor-pointer flex items-center justify-center gap-2 hover:bg-slate-600 transition-colors"
                                onClick={() => {
                                    navigate('/login');
                                    setSidebarVisible(false);
                                }}
                            >
                                <i className="pi pi-sign-in"></i>
                                <span>Login</span>
                            </button>
                        )}
                    </div>
                </div>
            </Sidebar>
        </header>
    );
}

export default Navegacao;