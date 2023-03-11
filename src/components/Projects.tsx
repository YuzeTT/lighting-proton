import { createSignal, For } from 'solid-js'
import { Icon } from '@iconify-icon/solid';
import Crab from '@iconify-icons/fluent-emoji-flat/crab'
import EightSpokedAsterisk from '@iconify-icons/fluent-emoji-flat/eight-spoked-asterisk'
import Newspaper from '@iconify-icons/fluent-emoji-flat/newspaper'
import AntennaBars from '@iconify-icons/fluent-emoji-flat/antenna-bars'
import RolledUpNewspaper from '@iconify-icons/fluent-emoji-flat/rolled-up-newspaper'
import Ice from '@iconify-icons/fluent-emoji-flat/ice'
import ShoppingCart from '@iconify-icons/fluent-emoji-flat/shopping-cart'

export default function Projects() {
  const projectList = [
		{
      icon: EightSpokedAsterisk,
      name: 'UniAnalytics',
      describe: 'Out site tips + statistics',
      url: 'https://github.com/YuzeTT/UniAnalytics',
    },
		{
      icon: Crab,
      name: 'watch-crab',
      describe: 'Twitter follower monitoring',
      url: 'https://github.com/YuzeTT/watch-crab',
    },
		{
      icon: Newspaper,
      name: 'paper-share',
      describe: 'Quick article writing / share',
      url: 'https://github.com/YuzeTT/paper-share',
    },
		{
      icon: RolledUpNewspaper,
      name: 'lighting-page',
      describe: 'Personal homepage template',
      url: 'https://github.com/YuzeTT/lighting-page',
    },
		{
      icon: Ice,
      name: 'blooock',
      describe: 'Start page for Minecraft players',
      url: 'https://a.hsott.cn',
    },
		{
      icon: ShoppingCart,
      name: 'GeeView-vue',
      describe: 'Lightweight shopping platform',
      url: 'https://github.com/YuzeTT/GeeView-vue',
    },
	]
  return (
    <div class='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <For each={projectList}>
        {(item) => 
          <a href="#" class='flex items-center gap-3 bg-zinc-50 hover:bg-zinc-100 transition rounded-md p-3'>
            <Icon icon={item.icon} class="text-4xl" />
            {/* {item.icon} */}
            <div>
              <h2 class='text-lg'>{item.name}</h2>
              <p class='text-zinc-500 text-sm'>{item.describe}</p>
            </div>
          </a>
        }
      </For>
      <div class='i-fluent-emoji-flat-eight-spoked-asterisk'></div>
    </div>
  )
}
