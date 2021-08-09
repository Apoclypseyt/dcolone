import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import SidebarFooter from './sidebar-footer';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ContextMenuTrigger } from 'react-contextmenu';
import { toggleDropdown } from '../../../store/ui';
import GuildDropdown from '../../dropdowns/guild-dropdown';
import ChannelMenu from '../../ctx-menus/channel-menu';

import './sidebar-content.scoped.css';

const SidebarContent: React.FunctionComponent = () => {  
  const dispatch = useDispatch();
  const ui = useSelector((s: Store.AppStore) => s.ui);
  
  const isActive = (c) => c.id === ui.activeChannel?.id;
  const channels = ui.activeGuild?.channels.map(c => (
    <ContextMenuTrigger key={c.id} id={c.id}>
      <Link
        to={`/channels/${ui.activeGuild!.id}/${c.id}`}
        className={`
          cursor-pointer flex items-center rounded h-8 p-2 pl-3
          ${isActive(c) && 'active'}`}>
        <FontAwesomeIcon
          className="float-left mr-2 scale-150 muted fill-current"
          icon={faHashtag} />
        <span className={`${!isActive(c) && 'font'}`}>{c.name}</span>
      </Link>
      <ChannelMenu channel={c} />
    </ContextMenuTrigger>
  ));

  return (
    <div className="flex flex-col bg-bg-secondary w-60">
      <div
        className="items-center shadow-elevation cursor-pointer h-12 pl-2.5 pr-4"
        onClick={() => dispatch(toggleDropdown(GuildDropdown))}>
        <GuildDropdown />
      </div>
      <nav className="flex-grow px-2 pt-4">{channels}</nav>
      <SidebarFooter />
    </div>
  );
}
 
export default SidebarContent;