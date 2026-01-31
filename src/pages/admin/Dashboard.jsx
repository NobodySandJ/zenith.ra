import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  HiOutlineCurrencyDollar,
  HiOutlineShoppingCart,
  HiOutlineEye,
  HiOutlineTrendingUp,
  HiOutlineCalendar
} from 'react-icons/hi'
import { DashboardStatsSkeleton, ChartSkeleton, TableSkeleton } from '@components/common/Skeleton'

// Register ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function AdminDashboard() {
  const { t } = useTranslation()
  const [period, setPeriod] = useState('week')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalViews: 0,
    growthRate: 0
  })
  const [chartData, setChartData] = useState([])
  const [topProducts, setTopProducts] = useState([])

  // Dummy data generator based on period
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      generateDummyData()
      setLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [period])

  const generateDummyData = () => {
    let labels = []
    let salesData = []
    let ordersData = []
    let viewsData = []

    if (period === 'week') {
      labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      salesData = [1200, 1900, 800, 1500, 2300, 2800, 1800]
      ordersData = [12, 19, 8, 15, 23, 28, 18]
      viewsData = [450, 580, 320, 490, 720, 890, 650]
      setStats({
        totalRevenue: 12300,
        totalOrders: 123,
        totalViews: 4100,
        growthRate: 12.5
      })
    } else if (period === 'month') {
      labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4']
      salesData = [8500, 12300, 9800, 15600]
      ordersData = [85, 123, 98, 156]
      viewsData = [3200, 4100, 3500, 5200]
      setStats({
        totalRevenue: 46200,
        totalOrders: 462,
        totalViews: 16000,
        growthRate: 8.3
      })
    } else {
      labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      salesData = [32000, 28000, 35000, 42000, 38000, 45000, 52000, 48000, 55000, 58000, 62000, 75000]
      ordersData = [320, 280, 350, 420, 380, 450, 520, 480, 550, 580, 620, 750]
      viewsData = [12000, 10500, 13000, 15500, 14000, 16500, 19000, 17500, 20000, 21000, 22500, 27000]
      setStats({
        totalRevenue: 570000,
        totalOrders: 5700,
        totalViews: 208500,
        growthRate: 15.8
      })
    }

    setChartData({ labels, salesData, ordersData, viewsData })

    // Top products
    setTopProducts([
      { id: 1, name: 'Dr. Doom Signature Tee', sales: 245, revenue: 12250, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100' },
      { id: 2, name: 'Neon Cyber Hoodie', sales: 189, revenue: 15120, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100' },
      { id: 3, name: 'Zenith Classic Black', sales: 156, revenue: 6240, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100' },
      { id: 4, name: 'Latverian Elite Edition', sales: 134, revenue: 10720, image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=100' },
      { id: 5, name: 'Urban Warrior Tee', sales: 112, revenue: 4480, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=100' }
    ])
  }

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#1a1a1a',
        titleColor: '#ffd700',
        bodyColor: '#fff',
        borderColor: '#d4af37',
        borderWidth: 1,
        padding: 12,
        displayColors: false
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255,255,255,0.05)'
        },
        ticks: {
          color: '#888'
        }
      },
      y: {
        grid: {
          color: 'rgba(255,255,255,0.05)'
        },
        ticks: {
          color: '#888'
        }
      }
    }
  }

  // Line chart data
  const lineChartData = {
    labels: chartData.labels || [],
    datasets: [
      {
        label: 'Sales',
        data: chartData.salesData || [],
        borderColor: '#ffd700',
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#ffd700',
        pointBorderColor: '#d4af37',
        pointHoverRadius: 8,
        pointRadius: 4
      }
    ]
  }

  // Bar chart data
  const barChartData = {
    labels: chartData.labels || [],
    datasets: [
      {
        label: 'Orders',
        data: chartData.ordersData || [],
        backgroundColor: 'rgba(192, 192, 192, 0.7)',
        borderColor: '#c0c0c0',
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: '#e8e8e8'
      }
    ]
  }

  // Doughnut chart data for category distribution
  const doughnutData = {
    labels: ['T-Shirts', 'Hoodies', 'Accessories', 'Limited Edition'],
    datasets: [
      {
        data: [45, 25, 15, 15],
        backgroundColor: [
          '#ffd700',
          '#c0c0c0',
          '#39ff14',
          '#d4af37'
        ],
        borderColor: '#0a0a0a',
        borderWidth: 2,
        hoverOffset: 4
      }
    ]
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#888',
          padding: 15,
          usePointStyle: true
        }
      }
    }
  }

  const StatCard = ({ icon: Icon, label, value, trend, trendValue, color = 'gold' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-dark p-6 group hover:border-gold-500/30 hover:shadow-[0_0_20px_rgba(255,215,0,0.1)] transition-all"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {trendValue && (
            <p className={`text-sm mt-2 flex items-center ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              <HiOutlineTrendingUp className={`w-4 h-4 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} />
              {trendValue}% vs last period
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-br from-gold-900/20 to-silver-900/10 border border-gold-500/20 group-hover:border-gold-500/40 transition-colors`}>
          <Icon className={`w-6 h-6 text-gold-400`} />
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{t('admin.dashboard.title')}</h1>
          <p className="text-gray-500">{t('admin.dashboard.subtitle')}</p>
        </div>

        {/* Period Filter */}
        <div className="flex items-center gap-2 bg-dark-800 rounded-lg p-1">
          {['week', 'month', 'year'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                period === p
                  ? 'bg-gradient-to-r from-gold-metallic to-gold-doom text-dark-950 shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t(`admin.dashboard.${p}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <DashboardStatsSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={HiOutlineCurrencyDollar}
            label={t('admin.dashboard.totalRevenue')}
            value={`$${stats.totalRevenue.toLocaleString()}`}
            trend="up"
            trendValue={stats.growthRate}
          />
          <StatCard
            icon={HiOutlineShoppingCart}
            label={t('admin.dashboard.totalOrders')}
            value={stats.totalOrders.toLocaleString()}
            trend="up"
            trendValue={8.2}
          />
          <StatCard
            icon={HiOutlineEye}
            label={t('admin.dashboard.totalViews')}
            value={stats.totalViews.toLocaleString()}
            trend="up"
            trendValue={15.3}
          />
          <StatCard
            icon={HiOutlineCalendar}
            label={t('admin.dashboard.avgOrderValue')}
            value={`$${(stats.totalRevenue / stats.totalOrders || 0).toFixed(2)}`}
            trend="up"
            trendValue={3.2}
          />
        </div>
      )}

      {/* Charts Row */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      ) : (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-dark p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            {t('admin.dashboard.salesOverview')}
          </h3>
          <div className="h-[300px]">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Orders Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-dark p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            {t('admin.dashboard.ordersOverview')}
          </h3>
          <div className="h-[300px]">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </motion.div>
      </div>
      )}

      {/* Bottom Row */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TableSkeleton rows={5} cols={3} />
          </div>
          <ChartSkeleton />
        </div>
      ) : (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-dark p-6 lg:col-span-2"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            {t('admin.dashboard.topProducts')}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-500 text-sm border-b border-dark-700">
                  <th className="text-left pb-3 font-medium">Product</th>
                  <th className="text-right pb-3 font-medium">Sales</th>
                  <th className="text-right pb-3 font-medium">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-700">
                {topProducts.map((product, index) => (
                  <tr key={product.id} className="group hover:bg-dark-800/50">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-600 text-sm w-5">{index + 1}</span>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <span className="text-white group-hover:text-gold-400 transition-colors">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="text-right text-gray-400">{product.sales}</td>
                    <td className="text-right text-gold-400 font-medium">
                      ${product.revenue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-dark p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            {t('admin.dashboard.categoryDistribution')}
          </h3>
          <div className="h-[250px]">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </motion.div>
      </div>
      )}

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card-dark p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">
          {t('admin.dashboard.recentActivity')}
        </h3>
        <div className="space-y-4">
          {[
            { action: 'New order received', product: 'Dr. Doom Signature Tee x2', time: '2 minutes ago', type: 'order' },
            { action: 'Product updated', product: 'Neon Cyber Hoodie', time: '15 minutes ago', type: 'update' },
            { action: 'New order received', product: 'Zenith Classic Black x1', time: '1 hour ago', type: 'order' },
            { action: 'Low stock alert', product: 'Latverian Elite Edition (5 left)', time: '2 hours ago', type: 'alert' },
            { action: 'New review', product: 'Urban Warrior Tee - 5 stars', time: '3 hours ago', type: 'review' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-dark-800/50 transition-colors">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'order' ? 'bg-gold-metallic shadow-[0_0_8px_rgba(255,215,0,0.6)]' :
                activity.type === 'alert' ? 'bg-yellow-500' :
                activity.type === 'review' ? 'bg-silver-metallic' :
                'bg-gray-500'
              }`} />
              <div className="flex-1">
                <p className="text-white text-sm">{activity.action}</p>
                <p className="text-gray-500 text-xs">{activity.product}</p>
              </div>
              <span className="text-gray-600 text-xs">{activity.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
