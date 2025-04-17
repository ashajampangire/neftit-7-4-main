import { Button } from "@/components/ui/button";
import { Twitter, MessageCircle, Wallet, Check, Trophy, Sparkles, Gem, ArrowRight, Info, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  type?: 'twitter' | 'discord' | 'wallet' | 'other';
}

interface NFTTaskListProps {
  tasks: Task[];
}

export const NFTTaskList = ({ tasks: initialTasks }: NFTTaskListProps) => {
  const [tasks, setTasks] = useState(initialTasks);
  
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = (completedTasks / totalTasks) * 100;
  
  const handleTaskComplete = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    toast.success("Task status updated!");
  };

  const getTaskIcon = (type?: string) => {
    switch (type) {
      case 'twitter':
        return <Twitter className="h-5 w-5 text-white" />;
      case 'discord':
        return <MessageCircle className="h-5 w-5 text-white" />;
      case 'wallet':
        return <Wallet className="h-5 w-5 text-white" />;
      default:
        return <MessageCircle className="h-5 w-5 text-white" />;
    }
  };

  return (
    <div className="w-full text-left p-0 m-0">
      {/* Header */}
      <div className="w-full text-left mb-4 mt-0 pt-0">
        <h2 className="text-3xl font-bold text-white text-left mt-0 pt-0">
          Campaign Tasks
        </h2>
        <p className="text-gray-400 text-left mt-2">Complete tasks to earn exclusive rewards</p>
        
        <div className="mt-4 w-full">
          <div className="flex justify-between text-left text-sm text-gray-400 mb-2">
            <span className="text-left">Campaign Progress</span>
            <span>{completedTasks}/{totalTasks} Tasks</span>
          </div>
          <Progress value={completionPercentage} className="w-full h-2 [&>[role=progressbar]]:bg-cyan-400 bg-[#1A2335]" />
        </div>
      </div>

      {/* Tasks - Horizontal scrollable layout */}
      <div className="w-full overflow-x-auto pb-4">
        <div className="flex space-x-4 min-w-full">
          {tasks.map((task) => (
            <div 
              key={task.id}
              className="min-w-[280px] bg-[#080A12] border border-[#1A2335]/50 rounded-md p-4 flex-shrink-0"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-lg bg-[#1A2335]">
                  {getTaskIcon(task.type)}
                </div>
                <div className="text-left">
                  <div className="font-medium text-white text-left">
                    {task.title}
                  </div>
                </div>
              </div>
              
              <Button 
                size="sm"
                className="bg-[#1A2335] hover:bg-[#243046] text-white border-0 rounded w-full mt-2"
                onClick={() => handleTaskComplete(task.id)}
              >
                {task.completed ? (
                  <>
                    <Check className="h-4 w-4 mr-1.5" />
                    Completed
                  </>
                ) : (
                  <>
                    Verify Task
                    <ChevronRight className="h-4 w-4 ml-1.5" />
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Rewards Section */}
      <div className="mt-6 bg-[#080A12] border border-[#1A2335]/50 p-6 w-full text-left">
        <h3 className="text-2xl font-bold text-white mb-2 text-left">Campaign Rewards</h3>
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-6 text-left">
          <Info className="h-4 w-4" />
          <span className="text-left">NFTs will be claimable after campaign end</span>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="text-left">
              <div className="flex items-center gap-2 mb-2 text-left">
                <Trophy className="h-5 w-5 text-white" />
                <span className="text-gray-400 text-left">XP Reward</span>
              </div>
              <div className="text-2xl font-bold text-white text-left">10 XP</div>
            </div>
            
            <div className="text-left">
              <div className="flex items-center gap-2 mb-2 text-left">
                <Gem className="h-5 w-5 text-white" />
                <span className="text-gray-400 text-left">NEFT Reward</span>
              </div>
              <div className="text-2xl font-bold text-white text-left">10 NEFT</div>
            </div>
          </div>
          
          <div className="mt-6 md:mt-0">
            <Button 
              className={cn(
                "rounded-full px-5 font-medium",
                completedTasks === totalTasks 
                  ? "bg-cyan-400 hover:bg-cyan-500 text-black" 
                  : "bg-[#1A2335] text-white"
              )}
              disabled={completedTasks !== totalTasks}
            >
              {completedTasks === totalTasks ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Claim Rewards
                </>
              ) : (
                <>
                  {completionPercentage}% Complete
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
